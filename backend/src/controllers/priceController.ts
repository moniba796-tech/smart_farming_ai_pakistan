/**
 * controllers/priceController.ts
 * ----------------------------------
 * Crop/commodity price lookup by province (see data/cropPriceData.ts for
 * the important disclaimer about these being indicative, not live, rates).
 */

import { Request, Response } from "express";
import { getCropPricesByProvince, getAvailableProvinces } from "../data/cropPriceData";
import { asyncHandler } from "../middleware/errorHandler";

/** GET /api/prices?province=Punjab */
export const getPricesByProvince = asyncHandler(async (req: Request, res: Response) => {
  const { province } = req.query;

  if (typeof province !== "string" || !province.trim()) {
    res.status(400).json({
      success: false,
      error: "Please provide a 'province' query parameter.",
      availableProvinces: getAvailableProvinces(),
    });
    return;
  }

  const prices = getCropPricesByProvince(province);

  if (prices.length === 0) {
    res.json({
      success: true,
      province,
      prices: [],
      note: "No price data available for this province yet.",
      availableProvinces: getAvailableProvinces(),
    });
    return;
  }

  res.json({ success: true, province, prices });
});

/** GET /api/prices/provinces */
export const listProvinces = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ success: true, provinces: getAvailableProvinces() });
});
