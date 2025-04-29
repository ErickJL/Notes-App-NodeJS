import noteService from "./Services/JsonFile/noteService.js";
import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('Views/index.html', (err, content) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end({message: 'Internal Server Error'});
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
} else if (req.method === "GET" && req.url === "/notes") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(noteService.readAllNotes()));
  } else if (req.method === "GET" && req.url.startsWith("/notes")) {
    const title = decodeURIComponent(req.url.split('/')[2]);
        const item = noteService.readNote(title);
        if (item) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(item));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: 'Note not found' }));
        }
  } else if (req.method === "POST" && req.url === "/notes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const flag = noteService.addNote(JSON.parse(body));
      res.writeHead(201, { "Content-Type": "application/json" });
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
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({flag, message: "Note updated" }));
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/notes/")) {
    const title = decodeURIComponent(req.url.split("/")[2]);
    const flag = noteService.removeNote(title);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({flag, message: "Note deleted" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
