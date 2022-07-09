import { db } from "../configs/dbConfig.js";

export const tambahKategori = (req, res) => {
  const kategori = req.body.kategori;
  const tambah = "INSERT INTO Kategori (NamaKategori) VALUES (?);";

  db.query(tambah, kategori, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.send({
          err: err,
          pesan: "GAGAL MENAMBAH KATEGORI, KATEGORI SUDAH ADA",
        });
      } else {
        res.send({ err: err, pesan: "GAGAL MENAMBAH KATEGORI" });
      }
    } else {
      res.send({ data: result, pesan: "BERHASIL TAMBAH KATEFORI" });
    }
  });
};
export const getKategori = (req, res) => {
  const tambah = "select * from Kategori;";

  db.query(tambah, (err, result) => {
    if (err) {
      res.send({ err: err, pesan: "TIDAK BERHASIL MENDAPAT KATEGORI" });
    } else {
      res.send({ data: result, pesan: "BERHASIL MENDAPAT KATEGORI" });
    }
  });
};
