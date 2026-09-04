import { Router } from "express";
import { recommendCrop, getCropHistory } from "../controllers/cropController";
import { validateBody } from "../middleware/validate";
import { cropInputSchema } from "../types/schemas";

const router = Router();

// POST /api/crop/recommend
router.post("/recommend", validateBody(cropInputSchema), recommendCrop);

// GET /api/crop/history?farmerId=...
router.get("/history", getCropHistory);

export default router;
