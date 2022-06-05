import { createAccessTokens } from "../middleware/createJWT.js";
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
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
          res.header("Authorization", `Bearer ${accessToken}`);
          res.send({
            alert: 1,
            message: "Log In berhasil",
          });
        } else {
          res.send({
            alert: 2,
            message: "Username atau password salah",
          });
        }
      });
    } else {
      res.send({
        alert: 3,
        message: "Username tidak ditemukan",
      });
    }
  });
};
export const loginMobile = (req, res) => {
  res.send("HALOO LOGIN MOBILE");
};
