import readline from 'readline';

const askQuestion = (question) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

const start = () => {
    console.log("Aplikasi Catatan Sederhana");
}
const stop = () => {
    console.log("\nTerimakasih telah menggunakan aplikasi ini.\n");
}

const invalidMode = () => {
    console.log("\nMode tidak valid.");
}

const selectMode = async () => {
    console.log("\nPilih Mode :");
    console.log("0. Keluar");
    console.log("1. Tambah Catatan");
    console.log("2. Ubah Catatan");
    console.log("3. Hapus Catatan");
    console.log("4. Lihat detail Catatan");
    console.log("5. Lihat Semua Catatan");
    const mode = await askQuestion("Pilih Mode : ");
    return mode;
}

const addDataInput = async () => {
    console.log("\nTambah Catatan");
    const judul = await askQuestion("Masukan Judul : ");
    const isi = await askQuestion("Masukan Isi : ");
    return { judul, isi };
}
const updateDataInput = async () => {
    console.log("\Edit Catatan");
    const judulLama = await askQuestion("Masukan Judul yang akan diedit: ");
    const judul = await askQuestion("Masukan Judul baru: ");
    const isi = await askQuestion("Masukan Isi baru: ");
    return {judulLama, note: { judul, isi }};
}
const removeDataInput = async () => {
    console.log("\Hapus Catatan");
    const judul = await askQuestion("Masukan Judul yang akan dihapus: ");
    return judul;
}
const readDataInput = async () => {
    console.log("\Baca Catatan");
    const judul = await askQuestion("Masukan Judul yang akan dibaca: ");
    return judul;
}

const addDataOutput = (result) => {
    console.log(result ? "\nCatatan berhasil ditambahkan." : "\nCatatan gagal ditambahkan.");
}
const updateDataOutput = (result) => {
    console.log(result ? "\nCatatan berhasil diedit." : "\nCatatan gagal diedit.");
}
const removeDataOutput = (result) => {
    console.log(result ? "\nCatatan berhasil dihapus." : "\nCatatan gagal dihapus.");
}
const readDataOutput = (result) => {
    if (result) {
        console.log("\nCatatan ditemukan:");
        console.log(`Judul: ${result.judul}`); 
        console.log(`Isi: ${result.isi}`); 
    } else {
        console.log("\nCatatan tidak ditemukan.");
    }
}
const readAllDataOutput = (results) => {
    if (results.length > 0) {
        console.log("\nCatatan ditemukan:");
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.judul} => ${result.isi}`);
        });
    } else {
        console.log("\nCatatan tidak ditemukan.");
    }
}

export default { start, stop, selectMode, invalidMode, addDataInput, updateDataInput, removeDataInput, readDataInput, addDataOutput, updateDataOutput, removeDataOutput, readDataOutput, readAllDataOutput };