import jwt from "jsonwebtoken";
const { sign } = jwt;
export const createAccessTokens = (user) => {
  const accessToken = sign(
    { username: user },
    process.env.JWT_SECRET.toString(),
    {
      expiresIn: "5m",
    }
  );
  return accessToken;
};
export const createRefreshTokens = (user) => {
  const refreshToken = sign(
    { username: user },
    process.env.JWT_SECRET.toString(),
    {
      expiresIn: "10m",
    }
  );
  return refreshToken;
};
