import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routerAuth from "./router/auth.r.js";
import routerTask from "./router/tasks.r.js";
import { FRONTEND_URL, PORT } from "./config/config.js";
import connectDB from "./config/mongoConnectDB.js";
connectDB();

//* 🔻Servidor con Express
const app = express();

//* 🔻Middleware
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//* 🔻Rutas
app.use("/api/auth", routerAuth);
app.use("/api", routerTask);

//* 🔻Inicio servidor
app.listen(PORT, () => {
  console.log(`🌎🌐 Server running → http://localhost:${PORT}`);
});
