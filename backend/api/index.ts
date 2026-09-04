/**
 * api/index.ts
 * -------------
 * Vercel serverless entrypoint. Vercel automatically turns any file
 * under /api into a serverless function; this one wraps the same Express
 * app used for local dev (see ../src/app.ts) so route logic is never
 * duplicated between environments.
 *
 * Every request first ensures the MongoDB connection is ready (cheap and
 * safe to call repeatedly — see src/config/db.ts's caching), then hands
 * off to the normal Express app to handle routing exactly as it does
 * locally.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../src/app";
import { connectDB } from "../src/config/db";

const app = createApp();

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  await connectDB();
  // Express apps are valid (req, res) handlers, so we can call it directly.
  app(req as never, res as never);
}
