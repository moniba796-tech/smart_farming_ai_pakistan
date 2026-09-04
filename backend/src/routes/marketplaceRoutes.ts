import { Router } from "express";
import { fertilizerRecommendation, nearbyRetailers, retailerRegister } from "../controllers/marketplaceController";
import { validateBody } from "../middleware/validate";
import { retailerRegisterSchema } from "../types/schemas";

const router = Router();

// GET /api/marketplace/fertilizer?crop=wheat&lat=..&lon=..
router.get("/fertilizer", fertilizerRecommendation);

// GET /api/marketplace/nearby?lat=..&lon=..&radiusKm=..&category=fertilizer
router.get("/nearby", nearbyRetailers);

// POST /api/marketplace/retailers/register  (public retailer sign-up / interest form)
router.post("/retailers/register", validateBody(retailerRegisterSchema), retailerRegister);

export default router;
