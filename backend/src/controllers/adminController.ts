/**
 * controllers/adminController.ts
 * ----------------------------------
 * Admin-only endpoints: retailer verification queue, farmer list, and a
 * simple analytics summary. All routes here are protected by
 * middleware/auth.ts::requireAdmin.
 */

import { Request, Response } from "express";
import { Retailer } from "../models/Retailer";
import { FarmerProfile } from "../models/FarmerProfile";
import { DiseaseScan } from "../models/DiseaseScan";
import { CropRecommendation } from "../models/CropRecommendation";
import { isDBConnected } from "../config/db";
import { asyncHandler, ApiError } from "../middleware/errorHandler";

/** GET /api/admin/retailers?status=pending|verified|all */
export const listRetailers = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Admin data is unavailable — database is not connected.");
  const status = (req.query.status as string) || "pending";
  const filter = status === "all" ? {} : { verified: status === "verified" };
  const retailers = await Retailer.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, retailers });
});

/** PATCH /api/admin/retailers/:id/verify */
export const verifyRetailer = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Admin data is unavailable — database is not connected.");
  const retailer = await Retailer.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
  if (!retailer) throw new ApiError(404, "Retailer not found.");
  res.json({ success: true, retailer });
});

/** DELETE /api/admin/retailers/:id */
export const deleteRetailer = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Admin data is unavailable — database is not connected.");
  const retailer = await Retailer.findByIdAndDelete(req.params.id);
  if (!retailer) throw new ApiError(404, "Retailer not found.");
  res.json({ success: true, message: "Retailer removed." });
});

/** GET /api/admin/farmers */
export const listFarmers = asyncHandler(async (_req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Admin data is unavailable — database is not connected.");
  const farmers = await FarmerProfile.find({ role: "farmer" }).sort({ createdAt: -1 }).limit(200);
  res.json({ success: true, farmers });
});

/** GET /api/admin/analytics */
export const getAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Admin data is unavailable — database is not connected.");
  const [farmerCount, scanCount, cropRecCount, pendingRetailers, verifiedRetailers] = await Promise.all([
    FarmerProfile.countDocuments({ role: "farmer" }),
    DiseaseScan.countDocuments(),
    CropRecommendation.countDocuments(),
    Retailer.countDocuments({ verified: false }),
    Retailer.countDocuments({ verified: true }),
  ]);

  // Most common disease diagnoses (simple aggregation).
  const topDiseases = await DiseaseScan.aggregate([
    { $group: { _id: "$diseaseName", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // Most recommended crops.
  const topCrops = await CropRecommendation.aggregate([
    { $group: { _id: "$result.crop", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  res.json({
    success: true,
    totals: { farmerCount, scanCount, cropRecCount, pendingRetailers, verifiedRetailers },
    topDiseases: topDiseases.map((d) => ({ name: d._id || "Unknown", count: d.count })),
    topCrops: topCrops.map((c) => ({ name: c._id || "Unknown", count: c.count })),
  });
});
