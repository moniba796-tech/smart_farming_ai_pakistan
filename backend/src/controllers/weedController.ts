/**
 * controllers/weedController.ts
 * ---------------------------------
 * Weed Identification & Management endpoints.
 */

import { Request, Response } from "express";
import { WEED_DATA, getWeedsForCrop, getWeedByKey } from "../data/weedData";
import { asyncHandler } from "../middleware/errorHandler";

export const listWeeds = asyncHandler(async (req: Request, res: Response) => {
  const { crop } = req.query;
  const weeds = getWeedsForCrop(typeof crop === "string" ? crop : undefined);
  res.json({ success: true, weeds });
});

export const getWeed = asyncHandler(async (req: Request, res: Response) => {
  const { key } = req.params;
  const weed = getWeedByKey(key);
  if (!weed) {
    res.status(404).json({ success: false, error: `Could not find weed '${key}'.` });
    return;
  }
  res.json({ success: true, weed });
});

export const listAllWeeds = asyncHandler(async (_req: Request, res: Response) => {
  res.json({ success: true, weeds: WEED_DATA });
});
