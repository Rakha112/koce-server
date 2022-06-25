import bcrypt from "bcryptjs";
import { db } from "../configs/dbConfig.js";
const saltRounds = 10;

export const signup = (req, res) => {
  // Abil data username dan password dari Body Request
  const nomorhp = req.body.nohp;
  const email = req.body.email;
  const nama = req.body.nama;
  // SQL Query
  const signupSqlInsert =
    "INSERT INTO user (nomorhp, email, nama) VALUES (?,?,?);";
  // Masuk ke MYSQL database
  db.query(signupSqlInsert, [nomorhp, email, nama], (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        alert: 2,
        pesan: "Nomor HP sudah terdaftar",
      });
    }
    if (result) {
      res.send({
        alert: 1,
        pesan: "Sign Up berhasil, Silahkan Log In",
      });
    }
  });
};
