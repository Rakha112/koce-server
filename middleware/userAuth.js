import jwt from "jsonwebtoken";
const { verify } = jwt;
import jwt_decode from "jwt-decode";

export const validateToken = (req, res, next) => {
  const username = req.body.username;
  const accessToken1 = req.cookies["access-token"];
  const accessToken2 = req.header("authorization");
  //jika tidak ada access token
  if (accessToken1 === undefined) {
    // Token dari header authorization Bearer
    //Split Bearer dan Token
    const accessToken = accessToken2.split(" ");
    // ambil tokennya
    const token = accessToken[1];
    // Validasi Token
    try {
      // Cek apakah Username Token sama dengan username Req
      if (jwt_decode(token).username === username) {
        console.log("BENAR");
        // validasi Token
        verify(token, process.env.JWT_SECRET.toString(), (err, response) => {
          if (err) {
            throw err;
          }
          req.user = response.username;
          req.authenticated = true;
          return next();
        });
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
        pesan: "user tidak terautentikasi",
        err: err,
        // loggedIn: false,
      });
    }
  } else {
    const accessToken = accessToken1;
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
