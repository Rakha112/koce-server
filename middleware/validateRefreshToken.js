import jwt from "jsonwebtoken";
const { verify } = jwt;
import jwt_decode from "jwt-decode";
import { createAccessTokens } from "./createJWT.js";

export const validateRefreshToken = (req, res, next) => {
  const username = req.query.username;
  // Token dari web Cookie
  const tokenWeb = req.cookies["access-token"];
  // Token dari header
  const tokenMobile = req.header("authorization");
  //jika tidak ada access token
  if (tokenWeb === undefined) {
    // Token dari header authorization Bearer
    //Split Bearer dan Token
    const token = tokenMobile.split(" ");
    // ambil tokennya
    const refreshToken = token[1];
    console.log({ refreshToken });
    // Validasi Token
    try {
      // Cek apakah Username Token sama dengan username Req
      if (jwt_decode(refreshToken).username === username) {
        console.log("BENAR");
        // validasi accessToken
        verify(
          refreshToken,
          process.env.JWT_SECRET.toString(),
          // Jika accessToken sudah expired atau tidak Valid maka cek validasi refreshToken
          (err, response) => {
            if (err) {
              throw err;
            }
            // Jika accessToken valid
            const newAccessToken = createAccessTokens(username);
            console.log({ newAccessToken });
            res.status(201).header("authorization", `Bearer ${newAccessToken}`);
            req.username = username;
            req.loggedIn = true;
            return next();
          }
        );
      } else {
        //Jika username di token tidak sama dengan username di request body
        console.log("SALAH");
        return res.status(403).send({
          pesan: "user tidak terautentikasi refresh",
          valid: false,
          loggedIn: false,
        });
      }
    } catch (err) {
      console.log("ERROR REFRESH");
      return res.status(401).send({
        valid: false,
        pesan: "user tidak terautentikasi refresh",
        loggedIn: false,
      });
    }
  } else {
    const accessToken = tokenWeb;
    try {
      if (jwt_decode(accessToken).username === username) {
        console.log("BENAR");
        // validasi token
        verify(
          accessToken,
          process.env.JWT_SECRET.toString(),
          (err, response) => {
            if (err) {
              throw err;
            }
            req.user = response.username;
            req.authenticated = true;
            return next();
          }
        );
      } else {
        //Jika username di token tidak sama dengan username di request body
        console.log("SALAH");
        return res.send({
          pesan: "user tidak terautentikasi",
        });
      }
    } catch (err) {
      // jika error
      return res.send({
        pesan: "User tidak terautentikasi",
        err: err,
        // loggedIn: false,
      });
    }
  }
};
