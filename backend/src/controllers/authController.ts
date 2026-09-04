/**
 * controllers/authController.ts
 * ---------------------------------
 * Farmer registration and login (both email and phone are collected;
 * login accepts either as the identifier), plus a "me" endpoint for the
 * frontend to check who's currently logged in from a stored token.
 */

import { Request, Response } from "express";
import { FarmerProfile } from "../models/FarmerProfile";
import { hashPassword, comparePassword, signToken } from "../services/authService";
import { isDBConnected } from "../config/db";
import { asyncHandler, ApiError } from "../middleware/errorHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Registration is unavailable — database is not connected.");

  const { name, email, phone, password, preferredLanguage } = req.body;

  const existing = await FarmerProfile.findOne({ $or: [{ email }, { phone }] });
  if (existing) {
    throw new ApiError(409, "An account with this email or phone number already exists.");
  }

  const passwordHash = await hashPassword(password);
  const user = await FarmerProfile.create({
    name,
    email,
    phone,
    passwordHash,
    preferredLanguage: preferredLanguage || "roman_urdu",
    role: "farmer",
  });

  const token = signToken({ id: user.id, role: "farmer", email: user.email });

  res.status(201).json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: "farmer" },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Login is unavailable — database is not connected.");

  const { identifier, password } = req.body; // identifier = email OR phone

  const user = await FarmerProfile.findOne({
    $or: [{ email: identifier.toLowerCase() }, { phone: identifier }],
  }).select("+passwordHash");

  if (!user) {
    throw new ApiError(401, "No account found with that email/phone.");
  }

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, "Incorrect password.");
  }

  const token = signToken({ id: user.id, role: user.role, email: user.email });

  res.json({
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!isDBConnected()) throw new ApiError(503, "Database is not connected.");
  const user = await FarmerProfile.findById(req.user!.id);
  if (!user) {
    res.status(404).json({ success: false, error: "Account not found." });
    return;
  }
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      preferredLanguage: user.preferredLanguage,
      location: user.location,
      farmSizeAcres: user.farmSizeAcres,
      primaryCrops: user.primaryCrops,
    },
  });
});
