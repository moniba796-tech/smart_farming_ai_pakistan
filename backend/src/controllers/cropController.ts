/**
 * controllers/cropController.ts
 * ---------------------------------
 * Level 2: Smart Crop Recommendation endpoints.
 */

import { Request, Response } from "express";
import { predictCrop, CropInputs } from "../services/cropEngine";
import { CropRecommendation } from "../models/CropRecommendation";
import { isDBConnected } from "../config/db";
import { asyncHandler } from "../middleware/errorHandler";

export const recommendCrop = asyncHandler(async (req: Request, res: Response) => {
  const inputs = req.body as CropInputs;
  const result = predictCrop(inputs);

  if (isDBConnected()) {
    const { lat, lon, farmerId } = req.body;
    CropRecommendation.create({
      inputs,
      result,
      farmerId: farmerId || undefined,
      location: lat !== undefined && lon !== undefined ? { lat, lon } : undefined,
    }).catch((err) => console.error("[cropController] failed to save recommendation history:", err.message));
  }

  res.json({ success: true, ...result });
});

export const getCropHistory = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) {
    res.status(503).json({ success: false, error: "History is unavailable — database is not connected." });
    return;
  }
  const { farmerId } = req.query;
  const filter = farmerId ? { farmerId } : {};
  const records = await CropRecommendation.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, records });
});
