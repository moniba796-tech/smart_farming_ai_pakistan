/**
 * models/DiseaseScan.ts
 * ----------------------
 * A saved record of a plant-disease detection result, optionally linked
 * to a farmer profile and their GPS location at scan time (useful for
 * spotting regional disease outbreaks over time).
 */

import { Schema, model, Document, Types } from "mongoose";

export interface IDiseaseScan extends Document {
  farmerId?: Types.ObjectId;
  rawLabel: string;
  diseaseName: string;
  confidence: number;
  symptoms: string;
  causes: string;
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
  location?: { lat: number; lon: number };
  createdAt: Date;
}

const DiseaseScanSchema = new Schema<IDiseaseScan>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "FarmerProfile" },
    rawLabel: { type: String, required: true },
    diseaseName: { type: String, required: true },
    confidence: { type: Number, required: true, min: 0, max: 1 },
    symptoms: { type: String, required: true },
    causes: { type: String, required: true },
    organicTreatment: { type: String, required: true },
    chemicalTreatment: { type: String, required: true },
    prevention: { type: String, required: true },
    location: {
      lat: { type: Number },
      lon: { type: Number },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const DiseaseScan = model<IDiseaseScan>("DiseaseScan", DiseaseScanSchema);
