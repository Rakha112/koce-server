import { db } from "../configs/dbConfig.js";

export const getVariasi = (req, res) => {
  const produk = req.query.produk;
  const getVariasiQuery = "select * from Variasi where NamaProduk = ?;";

  db.query(getVariasiQuery, produk, (err, result) => {
    if (err) {
      res.status(404).send({
        err: err,
        pesan: "GAGAL MENDAPAT VARIASI",
      });
    } else {
      res
        .status(202)
        .send({ data: result, pesan: "BERHASIL MENAMBAH VARIASI" });
    }
  });
};
export const tambahVariasi = (req, res) => {
  const variasi = req.body.variasi;
  const maks = req.body.maks;
  const produk = req.body.produk;
  const tambah =
    "INSERT INTO variasi (NamaVariasi,NamaProduk, MaxPilihan) VALUES (?,?,?);";

  db.query(tambah, [variasi, produk, maks], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).send({
          err: err,
          pesan: "GAGAL MENAMBAH VARIASI, VARIASI SUDAH ADA",
        });
      } else {
        res.send({ err: err, pesan: "GAGAL MENAMBAH VARIASI" });
      }
    } else {
      res.status(201).send({ pesan: "BERHASIL TAMBAH VARIASI" });
    }
  });
};
