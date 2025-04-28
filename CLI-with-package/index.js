import noteService from "./Services/JsonFile/noteService.js";

import chalk from "chalk";
import { Command } from "commander";

const program = new Command();

program
  .command("add")
  .description("Menambahkan catatan baru")
  .option("-j, --judul <judul>", "Judul catatan")
  .option("-i, --isi <isi>", "Isi catatan")
  .action((options) => {
    if (!options.judul || !options.isi) {
      console.log(chalk.inverse.bold.yellow("Judul dan isi harus diisi!"));
      return;
    }

    const result = noteService.addNote({
      judul: options.judul,
      isi: options.isi,
    });
    console.log(
      result
        ? chalk.inverse.bold.green("Catatan berhasil ditambahkan.")
        : chalk.inverse.bold.red("Catatan gagal ditambahkan.")
    );
  });
program
  .command("edit")
  .description("Mengedit catatan")
  .option("-l, --judul-lama <judulLama>", "Judul catatan yang mau diedit")
  .option("-j, --judul <judul>", "Judul catatan")
  .option("-i, --isi <isi>", "Isi catatan")
  .action((options) => {
    if (!options.judulLama || !options.judul || !options.isi) {
      console.log(chalk.inverse.bold.yellow("Judul lama, judul dan isi harus diisi!"));
      return;
    }

    const result = noteService.updateNote(options.judulLama, {
      judul: options.judul,
      isi: options.isi,
    });
    console.log(
      result
        ? chalk.inverse.bold.green("Catatan berhasil diedit.")
        : chalk.inverse.bold.red("Catatan gagal diedit.")
    );
  });
program
  .command("remove")
  .description("Menghapus catatan")
  .option("-j, --judul <judul>", "Judul catatan")
  .action((options) => {
    if (!options.judul) {
      console.log(chalk.inverse.bold.yellow("Judul harus diisi!"));
      return;
    }

    const result = noteService.removeNote(options.judul);
    console.log(
      result
        ? chalk.inverse.bold.green("Catatan berhasil dihapus.")
        : chalk.inverse.bold.red("Catatan gagal dihapus.")
    );
  });
program
  .command("read")
  .description("Menghapus catatan")
  .option("-j, --judul <judul>", "Judul catatan")
  .action((options) => {
    if (!options.judul) {
      console.log(chalk.inverse.bold.yellow("Judul harus diisi!"));
      return;
    }

    const result = noteService.readNote(options.judul);
    if (result) {
        console.log(chalk.inverse.bold.green("\nCatatan ditemukan:"));
        console.log(chalk.green(`Judul: ${result.judul}`)); 
        console.log(chalk.green(`Isi: ${result.isi}`)); 
    } else {
        console.log("\nCatatan tidak ditemukan.");
    }
  });
program
  .command("read-all")
  .description("Menghapus catatan")
  .action(() => {
    const result = noteService.readAllNotes();
    if (result.length > 0) {
        console.log(chalk.inverse.bold.green("\nCatatan ditemukan:"));
        result.forEach((result, index) => {
            console.log(chalk.green(`${index + 1}. ${result.judul} => ${result.isi}`));
        });
    } else {
        console.log("\nCatatan tidak ditemukan.");
    }
  });

program.parse(process.argv);

// const runCommandLine = () => {
//     const input = commandLine.GetInput();
//     if (input) {
//         switch (input.arg) {
//             case "add":
//                 commandLine.SetOutput({arg: "add", val: noteService.addNote(input.val)});
//                 break;
//             case "edit":
//                 commandLine.SetOutput({arg: "edit", val: noteService.updateNote(input.val.judulLama, input.val.note)});
//                 break;
//             case "remove":
//                 commandLine.SetOutput({arg: "remove", val: noteService.removeNote(input.val)});
//                 break;
//             case "read":
//                 commandLine.SetOutput({arg: "read", val: noteService.readNote(input.val)});
//                 break;
//             case "read-all":
//                 commandLine.SetOutput({arg: "read-all", val: noteService.readAllNotes()});
//                 break;
//             default:
//                 console.log('Mode tidak valid.');
//         }
//     }
// }

// runCommandLine();
