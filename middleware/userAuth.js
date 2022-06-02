import { verify } from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const accessToken1 = req.cookies["access-token"];
  const accessToken2 = req.body.token || req.query.token;
  //jika tidak ada access token
  if (accessToken1 === undefined) {
    const accessToken = accessToken2;
    // Validasi Token
    try {
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
    } catch (err) {
      return res.send({
        pesan: "user tidak terautentikasi",
        loggedIn: false,
      });
    }
  } else {
    const accessToken = accessToken1;
    // validasi token
    try {
      const validToken = verify(
        accessToken,
        process.env.JWT_SECRET.toString(),
        (err, response) => {
          if (err) throw err;
          req.user = response.username;
          req.authenticated = true;
          return next();
        }
      );
    } catch (err) {
      return res.send({
        message: "User tidak terautentikasi",
        loggedIn: false,
      });
    }
  }
};
