/**
 * models/Retailer.ts
 * --------------------
 * A fertilizer/pesticide retailer or shop that wants to be discoverable
 * on the marketplace. Uses a GeoJSON Point + a 2dsphere index so we can
 * run "nearest retailers to this farmer's GPS location" queries directly
 * in MongoDB Atlas ($near), which is fast and needs no external mapping
 * service.
 *
 * New retailers start as `verified: false` — this is a public
 * "interest / sign-up" form (as requested: "if retailers like to connect
 * with us to sell their fertilizer and crop medicines"). An admin should
 * manually verify a retailer (e.g. via Atlas's Data Explorer, or a future
 * admin panel) before it's surfaced to farmers by default.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

export type ProductCategory = "fertilizer" | "pesticide" | "seeds" | "equipment" | "other";

export interface IRetailer extends Document {
  businessName: string;
  ownerName: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [lon, lat] — GeoJSON order
  };
  productCategories: ProductCategory[];
  productsOffered: string; // free-text description of what they sell
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RetailerSchema = new Schema<IRetailer>(
  {
    businessName: { type: String, required: true, trim: true, maxlength: 150 },
    ownerName: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, maxlength: 150 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    address: { type: String, trim: true, maxlength: 250 },
    location: {
      type: { type: String, enum: ["Point"], default: "Point", required: true },
      coordinates: { type: [Number], required: true }, // [lon, lat]
    },
    productCategories: {
      type: [String],
      enum: ["fertilizer", "pesticide", "seeds", "equipment", "other"],
      default: ["fertilizer"],
    },
    productsOffered: { type: String, trim: true, maxlength: 1000, default: "" },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

RetailerSchema.index({ location: "2dsphere" });

export const Retailer: Model<IRetailer> =
  mongoose.models.Retailer || mongoose.model<IRetailer>("Retailer", RetailerSchema);
