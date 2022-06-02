import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
export const createTokens = (user) => {
  const accessToken = sign(
    { username: user },
    process.env.JWT_SECRET.toString()
  );
  return accessToken;
};
