import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET_KEY } from "../config/config.js";

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET_KEY,
      {
        expiresIn: JWT_EXPIRATION,
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
export default createAccessToken;
