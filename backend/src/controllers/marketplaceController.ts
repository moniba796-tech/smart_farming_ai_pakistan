/**
 * controllers/marketplaceController.ts
 * ----------------------------------------
 * Marketplace endpoints: fertilizer recommendations, nearby retailer
 * search, and the public retailer sign-up form.
 */

import { Request, Response } from "express";
import {
  getMarketplaceRecommendation,
  findNearbyRetailers,
  registerRetailer,
} from "../services/marketplaceService";
import { asyncHandler } from "../middleware/errorHandler";
import type { ProductCategory } from "../models/Retailer";

/** GET /api/marketplace/fertilizer?crop=wheat&lat=..&lon=.. */
export const fertilizerRecommendation = asyncHandler(async (req: Request, res: Response) => {
  const { crop, lat, lon } = req.query;

  if (typeof crop !== "string" || !crop.trim()) {
    res.status(400).json({ success: false, error: "Please provide a 'crop' query parameter." });
    return;
  }

  const latNum = lat !== undefined ? Number(lat) : undefined;
  const lonNum = lon !== undefined ? Number(lon) : undefined;

  const result = await getMarketplaceRecommendation(crop, latNum, lonNum);

  if (result.fertilizers.length === 0) {
    res.json({
      success: true,
      fertilizers: [],
      nearbyRetailers: result.nearbyRetailers,
      note: "No specific fertilizer guide found for this crop yet — consult your local agriculture office for a soil-test based recommendation.",
    });
    return;
  }

  res.json({ success: true, ...result });
});

/** GET /api/marketplace/nearby?lat=..&lon=..&radiusKm=..&category=fertilizer */
export const nearbyRetailers = asyncHandler(async (req: Request, res: Response) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    res.status(400).json({ success: false, error: "Please provide numeric 'lat' and 'lon' query parameters." });
    return;
  }

  const radiusKm = req.query.radiusKm ? Number(req.query.radiusKm) : undefined;
  const category = req.query.category as ProductCategory | undefined;

  const retailers = await findNearbyRetailers({ lat, lon, radiusKm, category });
  res.json({ success: true, retailers });
});

/** POST /api/marketplace/retailers/register */
export const retailerRegister = asyncHandler(async (req: Request, res: Response) => {
  const retailer = await registerRetailer(req.body);
  res.status(201).json({
    success: true,
    message: "Thank you! Your shop has been submitted and will appear on the marketplace once verified by our team.",
    retailerId: retailer.id,
  });
});
