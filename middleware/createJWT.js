import jwt from "jsonwebtoken";
const { sign } = jwt;
export const createAccessTokens = (user) => {
  const accessToken = sign(
    { username: user },
    process.env.JWT_SECRET.toString(),
    {
      expiresIn: "30s",
    }
  );
  return accessToken;
};
export const createRefreshTokens = (user) => {
  const refreshToken = sign(
    { username: user },
    process.env.JWT_SECRET.toString(),
    {
      expiresIn: "3m",
    }
  );
  return refreshToken;
};
