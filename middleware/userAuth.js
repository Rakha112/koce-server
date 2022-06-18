import jwt from "jsonwebtoken";
const { verify } = jwt;
import jwt_decode from "jwt-decode";
import { createAccessTokens } from "./createJWT.js";
const verifyAccessToken = (accessToken) => {
  verify(accessToken, process.env.JWT_SECRET.toString(), (err, response) => {
    if (err) {
      throw err;
    }
    req.user = response.username;
    req.authenticated = true;
    return next();
  });
};

const verifyRefreshToken = (refreshToken, accessToken) => {
  verify(refreshToken, process.env.JWT_SECRET.toString(), (err, response) => {
    if (err) {
      throw err;
    }
    verifyAccessToken(accessToken);
  });
};

export const validateToken = (req, res, next) => {
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
    const accessToken = token[1];
    const refreshToken = token[2];
    // Validasi Token
    try {
      // Cek apakah Username Token sama dengan username Req
      if (jwt_decode(accessToken).username === username) {
        console.log("BENAR");
        // validasi accessToken
        verify(
          accessToken,
          process.env.JWT_SECRET.toString(),
          // Jika accessToken sudah expired atau tidak Valid maka cek validasi refreshToken
          (err, response) => {
            if (err) {
              throw err;
            }
            // Jika accessToken valid
            res.send({ loggedIn: true, username: response.username });
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
      // Jika accessToken expired validasi refreshToken
      verify(refreshToken, process.env.JWT_SECRET.toString(), (err) => {
        // Jika refreshToken sudah tidak valid atau expired maka user tidak terautentikasi
        if (err) {
          return res.send({
            pesan: "user tidak terautentikasi",
            err: err,
            // loggedIn: false,
          });
        }
        // Jika refreshToken masih valid Generate new Refresh Token
        const newAccessToken = createAccessTokens(username);
        res.header("Authorization", `Bearer ${newAccessToken}`);
        res.send({ token: newAccessToken });
        return next();
      });
      // jika error
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
