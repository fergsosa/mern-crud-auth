import User from "../models/mUser.js";
import bcrypt from "bcryptjs";
import {
  COOKIE_JWT_NAME,
  JWT_SECRET_KEY,
  SALT_ROUNDS,
} from "../config/config.js";
import createAccessToken from "../libs/jwt.js";
import jwt from "jsonwebtoken";

const cAuth = {
  register: async (req, res) => {
    const { email, password, username } = req.body;

    try {
      const userFound = await User.findOne({ email });
      if (userFound)
        return res.status(400).json(["🚫 The email is already in use"]);

      const passHast = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = new User({ username, email, password: passHast });
      const userSave = await newUser.save();

      const token = await createAccessToken({ id: userSave.id });

      res.cookie(COOKIE_JWT_NAME, token, {
        secure: true,
        sameSite: "none",
      });

      res.json({
        id: userSave.id,
        username: userSave.username,
        email: userSave.email,
        createdAt: userSave.createdAt,
      });
    } catch (error) {
      console.log("🚫 ", { error });
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userFound = await User.findOne({ email });
      if (!userFound)
        return res.status(400).json({ message: ["🚫User not found"] });

      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch)
        return res.status(400).json({ message: "🚫Incorrect password" });

      const token = await createAccessToken({
        id: userFound.id,
        username: userFound.username,
      });

      res.cookie(COOKIE_JWT_NAME, token, {
        secure: true,
        sameSite: "none",
      });

      res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  verifyToken: async (req, res) => {
    // console.log("❇️ ", req.cookies.token_fazt);
    // console.log("❇️", req.cookies[COOKIE_JWT_NAME]);
    const token = req.cookies[COOKIE_JWT_NAME];

    if (!token) return res.status(401).json({ message: "🚫 Unauthorized" });

    jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
      if (err) return res.status(401).json({ message: "🚫 Unauthorized" });

      const userFound = await User.findById(user.id);
      if (!userFound)
        return res.status(400).json({ message: ["🚫User not found"] });

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  },
  logout: async (req, res) => {
    // res.clearCookie(COOKIE_JWT_NAME);
    res.cookie(COOKIE_JWT_NAME, "", { expires: new Date(0) });
    return res.status(200).json({ message: "🔒 Sesión cerrada exitosamente" });
  },
};

export default cAuth;
