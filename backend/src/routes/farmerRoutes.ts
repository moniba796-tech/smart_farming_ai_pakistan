import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/farmerController";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/farmers/me
router.get("/me", requireAuth, getMyProfile);

// PATCH /api/farmers/me
router.patch("/me", requireAuth, updateMyProfile);

export default router;
