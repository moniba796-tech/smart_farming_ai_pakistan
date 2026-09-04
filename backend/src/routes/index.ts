import { Router, Request, Response } from "express";
import diseaseRoutes from "./diseaseRoutes";
import cropRoutes from "./cropRoutes";
import weedRoutes from "./weedRoutes";
import chatRoutes from "./chatRoutes";
import weatherRoutes from "./weatherRoutes";
import farmerRoutes from "./farmerRoutes";
import marketplaceRoutes from "./marketplaceRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import priceRoutes from "./priceRoutes";
import { isDBConnected } from "../config/db";
import { hasGroqKey } from "../services/groqService";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: "ok",
    db: isDBConnected() ? "connected" : "disconnected",
    groqConfigured: hasGroqKey(),
    weatherConfigured: !!process.env.OPENWEATHER_API_KEY,
    hfConfigured: !!process.env.HF_TOKEN, // no longer used by disease detection, kept for backward compatibility
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

router.use("/disease", diseaseRoutes);
router.use("/crop", cropRoutes);
router.use("/weeds", weedRoutes);
router.use("/chat", chatRoutes);
router.use("/weather", weatherRoutes);
router.use("/farmers", farmerRoutes);
router.use("/marketplace", marketplaceRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/prices", priceRoutes);

export default router;
