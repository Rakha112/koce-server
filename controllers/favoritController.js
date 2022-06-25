import { db } from "../configs/dbConfig.js";

export const addFavorit = (req, res) => {
  const nomor_hp = req.body.nomor_hp;
  const makanan = req.body.makanan;
  const deskripsi = req.body.deskripsi;
  const harga = req.body.harga;
  const postFavorit =
    "INSERT INTO favorit (nomor_hp,makanan,deskripsi,harga) VALUES (?,?,?,?)";
  db.query(
    postFavorit,
    [nomor_hp, makanan, deskripsi, harga],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(409).send({
            status: 2,
            message: "GAGAL TAMBAH FAVORIT",
          });
        }
      } else {
        res.status(201).send({
          status: 1,
          message: "BERHASIL TAMBAH FAVORIT",
        });
      }
    }
  );
};
export const deleteFavorit = (req, res) => {
  const makanan = req.body.makanan;
  const deleteFavorit = "DELETE FROM favorit WHERE makanan = ?;";
  db.query(deleteFavorit, makanan, (err, result) => {
    if (err) {
      res.status(404).send({
        status: 2,
        message: "GAGAL DELETE FAVORIT",
      });
    } else {
      res.status(200).send({
        status: 1,
        message: "BERHASIL DELETE FAVORIT",
      });
    }
  });
};
export const getFavorit = (req, res) => {
  const makanan = req.query.makanan;
  const getFavorit = "SELECT * FROM favorit WHERE makanan = ?;";
  db.query(getFavorit, makanan, (err, result) => {
    if (err) {
      res.status(404).send({
        status: 2,
        message: "TIDAK DITEMUKAN",
      });
    }
    if (result.length > 0) {
      res.status(200).send({
        status: 1,
        message: "BERHASIL DITEMUKAN",
      });
    } else {
      res.status(404).send({
        status: 2,
        message: "TIDAK DITEMUKAN",
      });
    }
  });
};
