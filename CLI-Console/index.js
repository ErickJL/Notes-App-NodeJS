import appConsole from './Apps/appConsole.js';
import noteService from './Services/JsonFile/noteService.js';
import commandLine from './Apps/commandLine.js';

const runAppConsole = async () => {
    noteService.init();

    appConsole.start();

    let mode = 0;
    do {
        mode = await appConsole.selectMode();
        switch (parseInt(mode)) {
            case 0:
                appConsole.stop();
                break
            case 1:
                const addNote = await appConsole.addDataInput();
                appConsole.addDataOutput(noteService.addNote(addNote));
                break;
            case 2:
                const updateNote = await appConsole.updateDataInput();
                appConsole.updateDataOutput(noteService.updateNote(updateNote.judulLama, updateNote.note));
                break;
            case 3:
                const hapusNote = await appConsole.removeDataInput();
                appConsole.removeDataOutput(noteService.removeNote(hapusNote));
                break;
            case 4:
                const readNote = await appConsole.readDataInput();
                appConsole.readDataOutput(noteService.readNote(readNote));
                break;
            case 5:
                appConsole.readAllDataOutput(noteService.readAllNotes());
                break;
            default:
                appConsole.invalidMode();
                break;
        }
    } while (mode != 0);
}

const runCommandLine = () => {
    const input = commandLine.GetInput();
    if (input) {
        switch (input.arg) {
            case "add":
                commandLine.SetOutput({arg: "add", val: noteService.addNote(input.val)});
                break;
            case "edit":
                commandLine.SetOutput({arg: "edit", val: noteService.updateNote(input.val.judulLama, input.val.note)});
                break;
            case "remove":
                commandLine.SetOutput({arg: "remove", val: noteService.removeNote(input.val)});
                break;
            case "read":
                commandLine.SetOutput({arg: "read", val: noteService.readNote(input.val)});
                break;            
            case "read-all":
                commandLine.SetOutput({arg: "read-all", val: noteService.readAllNotes()});
                break;
            default:
                console.log('Mode tidak valid.');
        }
    }
}

// runAppConsole();
runCommandLine();