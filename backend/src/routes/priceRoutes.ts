import { Router } from "express";
import { getPricesByProvince, listProvinces } from "../controllers/priceController";

const router = Router();

// GET /api/prices?province=Punjab
router.get("/", getPricesByProvince);

// GET /api/prices/provinces
router.get("/provinces", listProvinces);

export default router;
