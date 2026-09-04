/**
 * data/seed.ts
 * -------------
 * Not a data seeder in the traditional sense — crop/weed/disease knowledge
 * bases are static TypeScript data (see cropData.ts, weedData.ts,
 * diseaseData.ts) and don't need seeding into MongoDB.
 *
 * This script instead verifies your MONGODB_URI actually connects to
 * Atlas and that the Mongoose models/indexes register cleanly, which is
 * the most common setup issue people hit. Run with: npm run seed
 */

import "dotenv/config";
import mongoose from "mongoose";
import { FarmerProfile } from "../models/FarmerProfile";
import { DiseaseScan } from "../models/DiseaseScan";
import { CropRecommendation } from "../models/CropRecommendation";
import { ChatMessage } from "../models/ChatMessage";

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in your .env file. See .env.example.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  console.log("✅ Connected successfully.");

  // Ensure indexes exist for every model (safe to run repeatedly).
  await Promise.all([
    FarmerProfile.init(),
    DiseaseScan.init(),
    CropRecommendation.init(),
    ChatMessage.init(),
  ]);
  console.log("✅ Model indexes verified: FarmerProfile, DiseaseScan, CropRecommendation, ChatMessage");

  const counts = {
    farmers: await FarmerProfile.countDocuments(),
    scans: await DiseaseScan.countDocuments(),
    cropRecommendations: await CropRecommendation.countDocuments(),
    chatMessages: await ChatMessage.countDocuments(),
  };
  console.log("Current collection counts:", counts);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("❌ MongoDB Atlas connection check failed:", err.message);
  process.exit(1);
});
