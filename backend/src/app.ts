/**
 * app.ts
 * ------
 * Builds the Express app (middleware + routes) without starting an HTTP
 * server. Kept separate from server.ts so the exact same app can be:
 *   - run locally with app.listen() (see server.ts), or
 *   - wrapped as a Vercel serverless function (see api/index.ts)
 * without duplicating any setup.
 */

import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import apiRoutes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export function createApp(): Express {
  const app = express();

  // --- Security & parsing middleware ---
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // --- Rate limiting (protects the free-tier Groq/OpenWeather/HF quotas) ---
  // Note: on Vercel's serverless platform, in-memory rate-limit counters
  // reset on every cold start, so this becomes a soft/best-effort limit
  // rather than a hard guarantee. Fine for this project's scale; swap in
  // a Redis-backed store (e.g. @upstash/ratelimit) if you need it to be
  // strict across serverless invocations.
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests — please slow down and try again shortly." },
  });
  app.use("/api", apiLimiter);

  // --- Routes ---
  app.use("/api", apiRoutes);

  app.get("/", (_req, res) => {
    res.json({
      name: "Smart Farming AI Pakistan API",
      status: "running",
      docs: "/api/health",
    });
  });

  // --- Error handling (must be last) ---
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
