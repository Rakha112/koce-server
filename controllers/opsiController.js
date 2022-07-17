import { db } from "../configs/dbConfig.js";

export const tambahOpsi = (req, res) => {
  const opsi = req.body.opsi;
  const variasiId = req.body.variasiId;
  const tambahHarga = req.body.tambahHarga;
  const tambahOpsi =
    "INSERT INTO opsivariasi (NamaOpsiVariasi, VariasiId, TambahHarga) VALUES (?,?,?);";

  db.query(tambahOpsi, [opsi, variasiId, tambahHarga], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(409).send({
          err: err,
          pesan: "GAGAL MENAMBAH OPSI, OPSI SUDAH ADA",
        });
      } else {
        res.send({ err: err, pesan: "GAGAL MENAMBAH OPSI" });
      }
    } else {
      res.status(201).send({ pesan: "BERHASIL TAMBAH OPSI" });
    }
  });
};

export const deleteOpsi = (req, res) => {
  const opsi = req.query.opsi;
  const variasiId = req.query.variasiId;
  const deleteOpsi =
    "delete from opsivariasi where NamaOpsiVariasi = ? AND VariasiId = ?;";
  db.query(deleteOpsi, [opsi, variasiId], (err, result) => {
    if (err) {
      res
        .status(404)
        .send({ err: err, pesan: "TIDAK BERHASIL MENGHAPUS OPSI" });
    } else {
      res.status(200).send({ pesan: "BERHASIL MENGHAPUS OPSI" });
    }
  });
};

export const editStatus = (req, res) => {
  const opsi = req.body.opsi;
  const variasiId = req.body.variasiId;
  const status = req.body.status;
  const editStatus =
    "update opsivariasi set status = ? where NamaOpsiVariasi = ? AND VariasiId = ?;";
  db.query(editStatus, [status, opsi, variasiId], (err, result) => {
    if (err) {
      res
        .status(404)
        .send({ err: err, pesan: "TIDAK BERHASIL MERUBAH STATUS" });
    } else {
      res.status(200).send({ data: result, pesan: "BERHASIL MERUBAH MENU" });
    }
  });
};
