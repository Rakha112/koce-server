import bcrypt from "bcryptjs";
import { db } from "../configs/dbConfig.js";
const saltRounds = 10;

export const signup = (req, res) => {
  // Abil data username dan password dari Body Request
  const username = req.body.username;
  const password = req.body.password;
  // ENCRIPT PASSWORD
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    // SQL Query
    const signupSqlInsert =
      "INSERT INTO user (username, password) VALUES (?,?);";
    // Masuk ke MYSQL database
    db.query(signupSqlInsert, [username, hash], (err, result) => {
      if (err) {
        res.send({
          alert: 2,
          pesan: "Username sudah terdaftar",
        });
      }
      if (result) {
        res.send({
          alert: 1,
          pesan: "Sign Up berhasil, Silahkan Log In",
        });
      }
    });
  });
};
