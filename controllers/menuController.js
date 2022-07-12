import { db } from "../configs/dbConfig.js";

export const tambahMenu = (req, res) => {
  const nama = req.body.nama;
  const kategori = req.body.kategori;
  const harga = req.body.harga;
  const deskripsi = req.body.deskripsi;
  const foto = req.body.foto;
  const tambah =
    "INSERT INTO produk (NamaProduk, NamaKategori, Gambar, Deskripsi, Harga) VALUES (?,?,?,?,?);";

  db.query(tambah, [nama, kategori, foto, deskripsi, harga], (err, result) => {
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
      res.status(201).send({ pesan: "BERHASIL TAMBAH KATEFORI" });
    }
  });
};

export const getMenu = (req, res) => {
  const kategori = req.query.kategori;
  const getMenu = "select * from produk where NamaKategori = (?);";
  db.query(getMenu, kategori, (err, result) => {
    if (err) {
      res.status(404).send({ err: err, pesan: "TIDAK BERHASIL MENDAPAT MENU" });
    } else {
      res.status(200).send({ data: result, pesan: "BERHASIL MENDAPAT MENU" });
    }
  });
};

export const deleteMenu = (req, res) => {
  const kategori = req.query.kategori;
  const nama = req.query.nama;
  const deleteMenu =
    "delete from Produk where NamaKategori = ? AND NamaProduk = ?;";
  db.query(deleteMenu, [kategori, nama], (err, result) => {
    if (err) {
      res
        .status(404)
        .send({ err: err, pesan: "TIDAK BERHASIL MENGHAPUS MENU" });
    } else {
      res.status(200).send({ pesan: "BERHASIL MENGHAPUS MENU" });
    }
  });
};

export const editStatus = (req, res) => {
  const kategori = req.body.kategori;
  const nama = req.body.nama;
  const status = req.body.status;
  const editStatus =
    "update produk set status = ? where NamaProduk = ? and NamaKategori = ?;";
  db.query(editStatus, [status, nama, kategori], (err, result) => {
    if (err) {
      res
        .status(404)
        .send({ err: err, pesan: "TIDAK BERHASIL MERUBAH STATUS" });
    } else {
      res.status(200).send({ data: result, pesan: "BERHASIL MERUBAH MENU" });
    }
  });
};
