import { db } from "../configs/dbConfig.js";

export const getData = (req, res) => {
  const getData = `select k.NamaKategori, 
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('nama', p.NamaProduk, 'gambar', p.Gambar, "deskripsi", p.Deskripsi, 'harga', p.Harga, 'maxRasa', p.MaxRasa,
    'rasa', (SELECT JSON_ARRAYAGG(JSON_OBJECT('nama', r.NamaRasa, 'tambahHarga', r.TambahHarga)) FROM rasa r where r.NamaProduk=p.NamaProduk))) FROM produk p 
    WHERE p.NamaKategori=k.NamaKategori) AS produk
    from kategori k;`;

  db.query(getData, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ data: result });
    }
  });
};
