import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {
  createAccessToken,
  createRefreshToken,
  isAuthentic,
} from "../models/tokens.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
});

router.post("/sign_up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = await User.findOne({ email });
    if (!createUser) {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } else
      res
        .status(201)
        .json({ message: "Email already exist create another email" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = createAccessToken(user);
      const refreshToken = await createRefreshToken(user);

      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true, // Not accessible via JavaScript (protects against XSS)
          path: "/refresh_token",
          secure: true, // Use true if on HTTPS
          sameSite: "strict", // Protects against CSRF
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        })
        .json({ accessToken, user });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal error", error });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/refresh_token" });
    return res.status(200).json({ Message: "Logged out" });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Error", err });
  }
});

router.post("/protected", (req, res) => {
  try {
    const userId = isAuthentic(req);
    if (userId) {
      return res.json({ data: "This is a protected data" });
    } 
  } catch (err) {
    return res.status(500).json({ Message: "Internal error", err });
  }
});

router.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshToken;
  if(!token){
    return res.send({ accessToken: "" })
  }
  let payload = null
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(payload._id)
    if (!user || user.refreshToken !== token) {
      return res.send({ accessToken: "" });
    }
    const accessToken = createAccessToken(user);
    const refreshToken = await createRefreshToken(user);
  return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, // Not accessible via JavaScript (protects against XSS)
        path: "/refresh_token",
        secure: true, // Use true if on HTTPS
        sameSite: "strict", // Protects against CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .json({ accessToken, email: user.email });
  } catch (err) {
    return res.send({ accessToken: "" });
  }

})

export default router;
