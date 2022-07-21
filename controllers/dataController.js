import { db } from "../configs/dbConfig.js";

export const getData = (req, res) => {
  const getData = `select k.NamaKategori,
  (select JSON_ARRAYAGG(JSON_OBJECT('Nama', p.NamaProduk, 'Foto', p.Gambar, 'Deskripsi', p.Deskripsi, 'Harga', p.Harga, 
  'Variasi',(SELECT JSON_ARRAYAGG(JSON_OBJECT("Nama", v.NamaVariasi, "MaxPilihan", v.MaxPilihan, 
  "Opsi", (select JSON_ARRAYAGG(JSON_OBJECT("NamaOpsi", o.NamaOpsiVariasi, "TambahHarga", o.TambahHarga)) 
  from OpsiVariasi o where o.VariasiId = v.VariasiId)))
  from variasi v where v.NamaProduk = p.NamaProduk))) 
  from produk p where p.NamaKategori = k.NamaKategori) AS Menu
  from kategori k;`;

  db.query(getData, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ data: result });
    }
  });
};
