import { Router } from "express";
import cAuth from "../controllers/auth.c.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), cAuth.register);
router.post("/login", validateSchema(loginSchema), cAuth.login);

router.get("/verify", cAuth.verifyToken);
router.post("/logout", cAuth.verifyToken, cAuth.logout);

export default router;
