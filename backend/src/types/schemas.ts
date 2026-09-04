/**
 * types/schemas.ts
 * ------------------
 * Zod request-body schemas, used by middleware/validate.ts to reject bad
 * input with a clean 400 before it reaches a controller.
 */

import { z } from "zod";

export const cropInputSchema = z.object({
  nitrogen: z.number().min(0).max(200),
  phosphorus: z.number().min(0).max(200),
  potassium: z.number().min(0).max(200),
  temperature: z.number().min(-10).max(55),
  humidity: z.number().min(0).max(100),
  rainfall: z.number().min(0).max(500),
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
  farmerId: z.string().optional(),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
  sessionId: z.string().optional(),
  farmerId: z.string().optional(),
});

export const farmerProfileSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().max(30).optional(),
  preferredLanguage: z.enum(["english", "urdu", "roman_urdu"]).default("roman_urdu"),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    district: z.string().optional(),
    province: z.string().optional(),
    displayName: z.string().optional(),
  }),
  farmSizeAcres: z.number().min(0).optional(),
  primaryCrops: z.array(z.string()).optional(),
});

export const retailerRegisterSchema = z.object({
  businessName: z.string().min(2).max(150),
  ownerName: z.string().min(2).max(120),
  phone: z.string().min(7).max(30),
  email: z.string().email().optional(),
  city: z.string().min(2).max(100),
  address: z.string().max(250).optional(),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  productCategories: z
    .array(z.enum(["fertilizer", "pesticide", "seeds", "equipment", "other"]))
    .min(1, "Select at least one product category"),
  productsOffered: z.string().max(1000).optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(150),
  phone: z.string().min(7).max(30),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  preferredLanguage: z.enum(["english", "urdu", "roman_urdu"]).optional(),
});

export const loginSchema = z.object({
  identifier: z.string().min(3).max(150), // email or phone
  password: z.string().min(1),
});
