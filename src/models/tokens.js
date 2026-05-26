import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createAccessToken= (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
};

export const createRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
  user.refreshToken = refreshToken;
  await user.save(); // save refreshToken in database for the user

  return refreshToken;
};

export const isAuthentic = (req) => {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return user;
};
