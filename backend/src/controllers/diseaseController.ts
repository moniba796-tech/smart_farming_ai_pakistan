/**
 * controllers/diseaseController.ts
 * -----------------------------------
 * Level 1: Plant Disease Detection endpoints.
 */

import { Request, Response } from "express";
import { analyzePlantImage } from "../services/diseaseService";
import { DiseaseScan } from "../models/DiseaseScan";
import { isDBConnected } from "../config/db";
import { asyncHandler } from "../middleware/errorHandler";

export const analyzeImage = asyncHandler(async (req: Request, res: Response) => {
  const file = (req as any).file as Express.Multer.File | undefined;

  if (!file) {
    res.status(400).json({ success: false, error: "Please upload an image first." });
    return;
  }

  const result = await analyzePlantImage(file.buffer, file.mimetype);

  if (!result.success) {
    res.status(422).json(result);
    return;
  }

  // Best-effort save to history — never block the response on this.
  if (isDBConnected()) {
    const lat = req.body?.lat ? Number(req.body.lat) : undefined;
    const lon = req.body?.lon ? Number(req.body.lon) : undefined;
    DiseaseScan.create({
      rawLabel: result.rawLabel,
      diseaseName: result.name,
      confidence: result.confidence,
      symptoms: result.symptoms,
      causes: result.causes,
      organicTreatment: result.organicTreatment,
      chemicalTreatment: result.chemicalTreatment,
      prevention: result.prevention,
      farmerId: req.body?.farmerId || undefined,
      location: lat !== undefined && lon !== undefined ? { lat, lon } : undefined,
    }).catch((err) => console.error("[diseaseController] failed to save scan history:", err.message));
  }

  res.json(result);
});

export const getScanHistory = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) {
    res.status(503).json({ success: false, error: "History is unavailable — database is not connected." });
    return;
  }
  const { farmerId } = req.query;
  const filter = farmerId ? { farmerId } : {};
  const scans = await DiseaseScan.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, scans });
});
