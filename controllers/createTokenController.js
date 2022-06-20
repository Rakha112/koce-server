import { createAccessTokens } from "../middleware/createJWT.js";

export const createTokenController = (req, res) => {
  const username = req.query.username;
  if (username) {
    const accessToken = createAccessTokens(username);
    res.header("Authorization", `Bearer ${accessToken}`);
    res.send({ pesan: "Access Token Baru Sudah Terkirim" });
  } else {
    res.send({ pesan: "TIDAK ADA USER" });
  }
};
