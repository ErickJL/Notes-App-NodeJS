import fs from 'fs';
import path from 'path';

const dirPath = 'Resources'
const filePath = path.join(dirPath, 'notes.json');

const init = () => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Folder '${dirPath}' telah dibuat.`);
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf-8');
        console.log(`File '${filePath}' telah dibuat.`);
    }
}

const addNote = (note) => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const notes = JSON.parse(fileBuffer);
    if (notes.find(n => n.judul === note.judul)) {
        return false;
    }
    notes.push(note);
    fs.writeFileSync(filePath, JSON.stringify(notes));
    return true;
}
const updateNote = (judulLama, note) => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const notes = JSON.parse(fileBuffer);
    let oldNote = notes.find(n => n.judul === judulLama);
    if (oldNote) {
        oldNote.judul = note.judul;
        oldNote.isi = note.isi;
        fs.writeFileSync(filePath, JSON.stringify(notes));
        return true;
    } else {
        return false;
    }
}
const removeNote = (judul) => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const notes = JSON.parse(fileBuffer);
    let deleteIndex = notes.findIndex(n => n.judul === judul);
    if (deleteIndex !== -1) {
        notes.splice(deleteIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(notes));
        return true;
    } else {
        return false;
    }
}
const readNote = (judul) => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const notes = JSON.parse(fileBuffer);
    let note = notes.find(n => n.judul === judul);
    return note;
}

const readAllNotes = () => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8');
    const notes = JSON.parse(fileBuffer);
    return notes;
}

export default { init, addNote, updateNote, removeNote, readNote, readAllNotes };