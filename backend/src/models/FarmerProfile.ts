/**
 * models/FarmerProfile.ts
 * ------------------------
 * A farmer's account + profile: login credentials (email + phone, either
 * can be used to sign in), preferred language, and GPS-derived location
 * (used to auto-fill weather + region-specific crop/weed advice).
 *
 * `role` distinguishes regular farmers from admin accounts — see
 * data/seedAdmin.ts for the seeded admin account (admin@gmail.com).
 * Admins use this same collection/model rather than a separate one, since
 * an admin is just a user with elevated permissions, not a different kind
 * of farm data.
 */

import { Schema, model, Document } from "mongoose";

export type UserRole = "farmer" | "admin";

export interface IFarmerProfile extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: UserRole;
  preferredLanguage: "english" | "urdu" | "roman_urdu";
  location?: {
    lat: number;
    lon: number;
    district?: string;
    province?: string;
    displayName?: string;
  };
  farmSizeAcres?: number;
  primaryCrops?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const FarmerProfileSchema = new Schema<IFarmerProfile>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },
    phone: { type: String, required: true, unique: true, trim: true, maxlength: 30 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["farmer", "admin"], default: "farmer" },
    preferredLanguage: {
      type: String,
      enum: ["english", "urdu", "roman_urdu"],
      default: "roman_urdu",
    },
    location: {
      lat: { type: Number, min: -90, max: 90 },
      lon: { type: Number, min: -180, max: 180 },
      district: { type: String, trim: true },
      province: { type: String, trim: true },
      displayName: { type: String, trim: true },
    },
    farmSizeAcres: { type: Number, min: 0 },
    primaryCrops: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

FarmerProfileSchema.index({ "location.lat": 1, "location.lon": 1 });

export const FarmerProfile = model<IFarmerProfile>("FarmerProfile", FarmerProfileSchema);
