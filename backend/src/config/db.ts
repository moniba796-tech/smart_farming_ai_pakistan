/**
 * config/db.ts
 * ------------
 * MongoDB Atlas connection via Mongoose. Reads MONGODB_URI from the
 * environment (see .env.example). Never hardcode credentials.
 *
 * Caches the connection promise on the Node process so that repeated
 * calls to connectDB() (which happens on every cold start of a Vercel
 * serverless function) reuse the same connection instead of opening a
 * new one each time — this matters a lot on Vercel, where a traditional
 * "connect once at startup" pattern doesn't apply, and opening a fresh
 * connection per invocation can quickly exhaust Atlas's free-tier
 * connection limit under moderate traffic.
 */

import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForMongoose = global as any;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "[db] MONGODB_URI is not set. The API will run, but any endpoint that " +
        "reads/writes history (chat logs, scan history, saved farms) will " +
        "return a friendly 503 error until you configure MongoDB Atlas."
    );
    return;
  }

  // Already connected (warm serverless instance, or already-running local server).
  if (mongoose.connection.readyState === 1) return;

  // A connection attempt is already in flight for this process — reuse it
  // instead of racing a second one (can happen with concurrent cold-start
  // requests hitting the same warming instance).
  if (globalForMongoose._mongoosePromise) {
    try {
      await globalForMongoose._mongoosePromise;
      return;
    } catch {
      globalForMongoose._mongoosePromise = null; // fall through and retry below
    }
  }

  try {
    mongoose.set("strictQuery", true);
    globalForMongoose._mongoosePromise = mongoose.connect(uri, {
      // Keep the pool small — serverless functions run many short-lived
      // instances, so each one only needs a handful of connections.
      maxPoolSize: 5,
    });
    await globalForMongoose._mongoosePromise;
    console.log("[db] Connected to MongoDB Atlas");
  } catch (err) {
    globalForMongoose._mongoosePromise = null;
    console.error("[db] Failed to connect to MongoDB Atlas:", (err as Error).message);
    console.warn("[db] Continuing without a database connection.");
  }
}

export function isDBConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
