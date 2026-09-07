/**
 * server.ts
 * ---------
 * Local development entrypoint: connects to MongoDB, builds the Express
 * app (see app.ts), and starts a traditional always-on HTTP server.
 *
 * This file is NOT used when deployed to Vercel — there, api/index.ts
 * wraps the same createApp() as a serverless function instead. Running
 * `npm run dev` or `npm start` locally still uses this file as normal.
 */
import "dotenv/config";
import { createApp } from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

async function start(): Promise<void> {
  await connectDB();
  const app = createApp();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] Smart Farming AI Pakistan API running on http://localhost:${PORT}`);
  });
}

start();
