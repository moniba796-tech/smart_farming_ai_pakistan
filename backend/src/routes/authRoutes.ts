import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { validateBody } from "../middleware/validate";
import { registerSchema, loginSchema } from "../types/schemas";
import { requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/auth/register
router.post("/register", validateBody(registerSchema), register);

// POST /api/auth/login  (identifier = email or phone)
router.post("/login", validateBody(loginSchema), login);

// GET /api/auth/me  (requires Bearer token)
router.get("/me", requireAuth, me);

export default router;
