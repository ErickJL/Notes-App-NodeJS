import noteService from "./Services/JsonFile/noteService.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from "express";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile('Views/index.html', {root: __dirname});
});
app.get("/notes", (req, res) => {
    res.json(noteService.readAllNotes());
});
app.get("/notes/:title", (req, res) => {
    const title = req.params.title;
    const item = noteService.readNote(title);
    if (item) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(item));
    } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Note not found' }));
    }
});
app.post("/notes", (req, res) => {
    const note = {
        judul: req.body.judul,
        isi: req.body.isi
    }
    const flag = noteService.addNote(note);
    res.json({flag, message: "Note added" });
});
app.put("/notes/:title", (req, res) => {
    const title = req.params.title;
    const note = {
        judul: req.body.judul,
        isi: req.body.isi
    }
    const flag = noteService.updateNote(title, note);
    res.json({flag, message: "Note updated" });
});
app.delete("/notes/:title", (req, res) => {
    const title = req.params.title;
    const flag = noteService.removeNote(title);
    res.json({flag, message: "Note deleted" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});