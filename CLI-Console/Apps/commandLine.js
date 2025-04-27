
const add = (arg1, val1, arg2, val2) => {
    if (arg1 && arg2 && val1 && val2) {
        if ((arg1 === "--judul" && arg2 === "--isi")) {
            return {arg: "add", val: {judul: val1, isi: val2}}
        } else if (arg1 === "--isi" && arg2 === "--judul"){
            return {arg: "add", val: {judul: val2, isi: val1}}
        } else {
            return null;
        }
    }
}
const edit = (arg1, val1, arg2, val2, arg3, val3) => {
    if (arg1 && arg2 && val1 && val2 && arg3 && val3) {
        if ((arg1 === "--judul-lama" && arg2 === "--judul" && arg3 === "--isi")) {
            return {arg: "edit", val: {judulLama: val1, note: {judul: val2, isi: val3}}}
        } else if (arg1 === "--judul-lama" && arg2 === "--isi" && arg3 === "--judul"){
            return {arg: "edit", val: {judulLama: val1, note: {judul: val3, isi: val2}}}
        } else if (arg1 === "--judul" && arg2 === "--judul-lama" && arg3 === "--isi"){
            return {arg: "edit", val: {judulLama: val2, note: {judul: val1, isi: val3}}}
        } else if (arg1 === "--judul" && arg2 === "--isi" && arg3 === "--judul-lama"){
            return {arg: "edit", val: {judulLama: val3, note: {judul: val1, isi: val2}}}
        } else if (arg1 === "--isi" && arg2 === "--judul-lama" && arg3 === "--judul"){
            return {arg: "edit", val: {judulLama: val2, note: {judul: val3, isi: val1}}}
        } else if (arg1 === "--isi" && arg2 === "--judul" && arg3 === "--judul-lama"){
            return {arg: "edit", val: {judulLama: val3, note: {judul: val2, isi: val1}}}
        } else {
            return null;
        }
    }
}
const remove = (arg, val) => {
    if (arg && val) {
        if (arg === "--judul") {
            return {arg: "remove", val}
        } else {
            return null;
        }
    }
}
const read = (arg, val) => {
    if (arg && val) {
        if (arg === "--judul") {
            return {arg: "read", val}
        } else {
            return null;
        }
    }
}

const GetInput = () => {
    const command = process.argv;
    switch (command[2]) {
        case 'add':
            const addData = add(command[3], command[4], command[5], command[6]);
            if (addData) {
                return addData;
            } else {
                console.log('Catatan gagal ditambahkan.');
            }
            break;
        case 'edit':
            const editData = edit(command[3], command[4], command[5], command[6], command[7], command[8]);
            if (editData) {
                return editData;
            } else {
                console.log('Catatan gagal diedit.');
            }
            break;
        case 'remove':
            const removeData = remove(command[3], command[4]);
            if (removeData) {
                return removeData;
            } else {
                console.log('Catatan gagal dihapus.');
            }
            break;
        case 'read':
            const readData = read(command[3], command[4]);
            if (readData) {
                return readData;
            } else {
                console.log('Catatan gagal ditemukan.');
            }
            break;
        case 'read-all':
            return {arg: "read-all"};
        default:
            console.log('Mode tidak valid.');
    }
}

const SetOutput = (result) => {
    switch (result.arg) {
        case "add":
            console.log(result.val ? "Catatan berhasil ditambahkan." : "Catatan gagal ditambahkan.")
            break;
        case "edit":
            console.log(result.val ? "Catatan berhasil diedit." : "Catatan gagal diedit.");
            break;
        case "remove":
            console.log(result.val ? "Catatan berhasil dihapus." : "Catatan gagal dihapus.");
            break;
        case "read":
            if (result.val) {
                console.log("\nCatatan ditemukan:");
                console.log(`Judul: ${result.judul}`); 
                console.log(`Isi: ${result.isi}`); 
            } else {
                console.log("\nCatatan tidak ditemukan.");
            }
            break;
        case "read-all":
            if (result.val.length > 0) {
                console.log("\nCatatan ditemukan:");
                result.val.forEach((result, index) => {
                    console.log(`${index + 1}. ${result.judul} => ${result.isi}`);
                });
            } else {
                console.log("\nCatatan tidak ditemukan.");
            }
            break;
        default:
            console.log('Mode tidak valid.');
            break;
    }
}

export default { GetInput, SetOutput };