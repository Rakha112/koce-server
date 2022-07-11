import { db } from "../configs/dbConfig.js";

export const tambahKategori = (req, res) => {
  const kategori = req.body.kategori;
  const tambah = "INSERT INTO Kategori (NamaKategori) VALUES (?);";

  db.query(tambah, kategori, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).send({
          err: err,
          pesan: "GAGAL MENAMBAH KATEGORI, KATEGORI SUDAH ADA",
        });
      } else {
        res.send({ err: err, pesan: "GAGAL MENAMBAH KATEGORI" });
      }
    } else {
      res.status(201).send({ data: result, pesan: "BERHASIL TAMBAH KATEFORI" });
    }
  });
};
export const getKategori = (req, res) => {
  const tambah = "select * from Kategori;";
  db.query(tambah, (err, result) => {
    if (err) {
      res.send({ err: err, pesan: "TIDAK BERHASIL MENDAPAT KATEGORI" });
    } else {
      res
        .status(200)
        .send({ data: result, pesan: "BERHASIL MENDAPAT KATEGORI" });
    }
  });
};
export const deleteKategori = (req, res) => {
  const kategori = req.query.kategori;
  const deleteQuery = "delete from Kategori where NamaKategori = (?);";
  db.query(deleteQuery, kategori, (err, result) => {
    console.log(err);
    if (err) {
      res
        .status(404)
        .send({ err: err, pesan: "TIDAK BERHASIL MENGHAPUS KATEGORI" });
    } else {
      res.status(200).send({ pesan: "BERHASIL MENGHAPUS KATEGORI" });
    }
  });
};
