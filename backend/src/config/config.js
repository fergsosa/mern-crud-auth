import "dotenv/config";

const PORT = Number(process.env.PORT) || 3000;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const FRONTEND_URL = process.env.FRONTEND_URL;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "90d";

const COOKIE_JWT_NAME = process.env.COOKIE_JWT_NAME;
const COOKIE_JWT_EXPIRES_DAY = Number(process.env.COOKIE_JWT_EXPIRES_DAY);

export {
  PORT,
  SALT_ROUNDS,
  FRONTEND_URL,
  JWT_SECRET_KEY,
  JWT_EXPIRATION,
  COOKIE_JWT_EXPIRES_DAY,
  COOKIE_JWT_NAME,
};
