import noteService from "./Services/JsonFile/noteService.js";
import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/notes") {
    res.statusCode = 200;
    res.end(JSON.stringify(noteService.readAllNotes()));
  } else if (req.method === "GET" && req.url.startsWith("/notes")) {
    const title = decodeURIComponent(req.url.split('/')[2]);
        const item = noteService.readNote(title);
        if (item) {
            res.statusCode = 200;
            res.end(JSON.stringify(item));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Note not found' }));
        }
  } else if (req.method === "POST" && req.url === "/notes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const flag = noteService.addNote(JSON.parse(body));
      res.statusCode = 201;
      res.end(JSON.stringify({flag, message: "Note added" }));
    });
  } else if (req.method === "PUT" && req.url.startsWith("/notes/")) {
    const title = decodeURIComponent(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const flag = noteService.updateNote(title, JSON.parse(body));
      res.statusCode = 200;
      res.end(JSON.stringify({flag, message: "Note updated" }));
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/notes/")) {
    const title = decodeURIComponent(req.url.split("/")[2]);
    const flag = noteService.removeNote(title);
    res.statusCode = 200;
    res.end(JSON.stringify({flag, message: "Note deleted" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
