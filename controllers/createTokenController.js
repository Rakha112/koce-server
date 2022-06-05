import {
  createAccessTokens,
  createRefreshTokens,
} from "../middleware/createJWT.js";

export const createTokenController = (req, res) => {
  const username = req.body.username;
  if (username) {
    const refreshToken = createRefreshTokens(username);
    const accessToken = createAccessTokens(username);
    res.header("access-token", accessToken);
    res.send({ refreshToken, accessToken });
  } else {
    res.send({ pesan: "TIDAK ADA USER" });
  }
};
