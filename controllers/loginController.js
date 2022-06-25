import {
  createAccessTokens,
  createRefreshTokens,
} from "../middleware/createJWT.js";
import { db } from "../configs/dbConfig.js";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const LoginQuery = "SELECT * FROM user WHERE username = ?;";
  db.query(LoginQuery, username, (err, result) => {
    if (err) {
      res.send({
        err: err,
      });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const accessToken = createAccessTokens(result[0].username);
          const refreshToken = createRefreshTokens(result[0].username);
          const token = accessToken + " " + refreshToken;
          res.cookie("access-token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
          res.send({
            alert: 1,
            pesan: "Log In berhasil",
          });
        } else {
          res.send({
            alert: 2,
            pesan: "Username atau password salah",
          });
        }
      });
    } else {
      res.send({
        alert: 3,
        pesan: "Username tidak ditemukan",
      });
    }
  });
};
export const loginMobile = (req, res) => {
  const nomorhp = req.body.nomorhp;
  const LoginQuery = "SELECT * FROM user WHERE nomorhp = ?;";
  db.query(LoginQuery, nomorhp, (err, result) => {
    if (err) {
      console.log(err);
      res.send({
        err: err,
      });
    }
    if (result.length > 0) {
      res.send({
        alert: 1,
        pesan: "Username ditemukan",
      });
    } else {
      res.send({
        alert: 2,
        pesan: "Username tidak ditemukan",
      });
    }
  });
};
