/**
 * models/CropRecommendation.ts
 * ------------------------------
 * A saved crop recommendation result (soil inputs -> predicted crop),
 * optionally tied to a farmer profile and GPS location.
 */

import { Schema, model, Document, Types } from "mongoose";

export interface ICropRecommendation extends Document {
  farmerId?: Types.ObjectId;
  inputs: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    temperature: number;
    humidity: number;
    rainfall: number;
  };
  result: {
    crop: string;
    confidence: number;
    season: string;
    water: string;
    fertilizer: string;
    sowing: string;
    harvest: string;
    expectedYield: string;
    alternatives: { crop: string; confidence: number }[];
  };
  location?: { lat: number; lon: number };
  createdAt: Date;
}

const CropRecommendationSchema = new Schema<ICropRecommendation>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "FarmerProfile" },
    inputs: {
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number,
      temperature: Number,
      humidity: Number,
      rainfall: Number,
    },
    result: {
      crop: String,
      confidence: Number,
      season: String,
      water: String,
      fertilizer: String,
      sowing: String,
      harvest: String,
      expectedYield: String,
      alternatives: [{ crop: String, confidence: Number }],
    },
    location: {
      lat: { type: Number },
      lon: { type: Number },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const CropRecommendation = model<ICropRecommendation>(
  "CropRecommendation",
  CropRecommendationSchema
);
