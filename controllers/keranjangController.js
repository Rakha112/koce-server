import { db } from "../configs/dbConfig.js";

export const tambahKeranjang = (req, res) => {
  const menu = req.body.menu;
  const foto = req.body.foto;
  const noHP = req.body.noHP;
  const hargaAsli = req.body.hargaAsli;
  const hargaTotal = req.body.hargaTotal;
  const jumlah = req.body.jumlah;
  const variasi = req.body.variasi;
  const tambah =
    "insert into keranjang (Menu, Foto, NomorHp, HargaAsli, HargaTotal, Jumlah, Variasi) VALUES (?,?,?,?,?,?,?);";

  db.query(
    tambah,
    [menu, foto, noHP, hargaAsli, hargaTotal, jumlah, variasi],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(409).send({
            err: err,
            pesan: "GAGAL MENAMBAH KERANJANG, KERANJANG SUDAH ADA",
          });
        } else {
          res.send({ err: err, pesan: "GAGAL MENAMBAH KERANJANG" });
        }
      } else {
        res.status(201).send({ pesan: "BERHASIL TAMBAH KERANJANG" });
      }
    }
  );
};
export const checkExist = (req, res) => {
  const menu = req.query.menu;
  const noHP = req.query.noHP;
  const variasi = req.query.variasi;
  const check =
    "SELECT EXISTS( SELECT * FROM keranjang WHERE Menu = ? and NomorHp = ? and JSON_CONTAINS(Variasi, ?)) as Exist;";
  db.query(check, [menu, noHP, variasi], (err, result) => {
    if (err) {
      res.status(404).send({ err: err, pesan: "GAGAL CHECK" });
    } else {
      res.status(200).send({ data: result, pesan: "BERHASIL CHECK" });
    }
  });
};

export const getKeranjang = (req, res) => {
  const noHP = req.query.noHP;
  const getKeranjang = `select * from Keranjang where NomorHp = ?;`;

  db.query(getKeranjang, noHP, (err, result) => {
    if (err) {
      res.status(404).send({
        err: err,
        pesan: "GAGAL MENDAPAT KERANJANG",
      });
    } else {
      res
        .status(200)
        .send({ data: result, pesan: "BERHASIL MENDAPAT KERANJANG" });
    }
  });
};
export const getSpesifik = (req, res) => {
  const menu = req.query.menu;
  const getSpesifik = `select *, (SELECT JSON_ARRAYAGG(JSON_OBJECT("Nama", v.NamaVariasi, "MaxPilihan", v.MaxPilihan, 
  "Opsi",(select JSON_ARRAYAGG(JSON_OBJECT("NamaOpsi", o.NamaOpsiVariasi, "TambahHarga", o.TambahHarga, 'Status', o.Status)) 
  from OpsiVariasi o where o.VariasiId = v.VariasiId)))
  from variasi v where v.NamaProduk = p.NamaProduk) as Variasi 
  from produk p where p.NamaProduk = ?;`;

  db.query(getSpesifik, menu, (err, result) => {
    if (err) {
      res.status(404).send({
        err: err,
        pesan: "GAGAL MENDAPAT KERANJANG",
      });
    } else {
      res
        .status(200)
        .send({ data: result, pesan: "BERHASIL MENDAPAT KERANJANG" });
    }
  });
};
