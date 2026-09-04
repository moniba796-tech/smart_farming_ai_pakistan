/**
 * data/seedAdmin.ts
 * -------------------
 * Creates (or resets) the admin account used to log into the Admin
 * Dashboard. Run once after connecting MongoDB Atlas:
 *
 *     npm run seed:admin
 *
 * Default credentials (change the password after first login in a real
 * deployment — this is a placeholder for development):
 *   Email:    admin@gmail.com
 *   Password: admin123
 */

import "dotenv/config";
import mongoose from "mongoose";
import { FarmerProfile } from "../models/FarmerProfile";
import { hashPassword } from "../services/authService";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_PHONE = "03000000000"; // placeholder — phone is required+unique on the model

async function main(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in your .env file. See .env.example.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  console.log("✅ Connected.");

  const existing = await FarmerProfile.findOne({ email: ADMIN_EMAIL });
  const passwordHash = await hashPassword(ADMIN_PASSWORD);

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.role = "admin";
    await existing.save();
    console.log(`✅ Existing admin account updated: ${ADMIN_EMAIL}`);
  } else {
    await FarmerProfile.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      passwordHash,
      role: "admin",
      preferredLanguage: "english",
    });
    console.log(`✅ Admin account created: ${ADMIN_EMAIL}`);
  }

  console.log("\nLogin with:");
  console.log(`  Email:    ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log("\n⚠️  Change this password in production!");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Failed to seed admin account:", err.message);
  process.exit(1);
});
