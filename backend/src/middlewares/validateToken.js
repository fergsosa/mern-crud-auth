import jwt from "jsonwebtoken";
import { COOKIE_JWT_NAME, JWT_SECRET_KEY } from "../config/config.js";

const mdAuth = (req, res, next) => {
  try {
    // const token = req.cookies.token_mio;
    const token = req.cookies[COOKIE_JWT_NAME];

    if (!token)
      return res
        .status(401)
        .json({ message: "🚫 No token, authorization denied" });

    jwt.verify(token, JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "🚫 Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default mdAuth;
