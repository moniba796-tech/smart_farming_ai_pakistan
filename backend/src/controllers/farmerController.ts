/**
 * controllers/farmerController.ts
 * -----------------------------------
 * A logged-in farmer's own profile: GPS location, preferred language,
 * farm size, and primary crops. Account creation now happens via
 * /api/auth/register (see authController.ts) — these endpoints only
 * read/update the profile of whoever's token is presented, so a farmer
 * can never view or edit another farmer's data by guessing an ID.
 */

import { Request, Response } from "express";
import { FarmerProfile } from "../models/FarmerProfile";
import { isDBConnected } from "../config/db";
import { asyncHandler, ApiError } from "../middleware/errorHandler";

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Database is not connected.");
  const profile = await FarmerProfile.findById(req.user!.id);
  if (!profile) {
    res.status(404).json({ success: false, error: "Profile not found." });
    return;
  }
  res.json({ success: true, profile });
});

export const updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Database is not connected.");
  // Never allow a profile update to change auth-sensitive fields directly.
  const { email, phone, passwordHash, role, ...safeUpdates } = req.body;
  const profile = await FarmerProfile.findByIdAndUpdate(req.user!.id, safeUpdates, {
    new: true,
    runValidators: true,
  });
  if (!profile) {
    res.status(404).json({ success: false, error: "Profile not found." });
    return;
  }
  res.json({ success: true, profile });
});
