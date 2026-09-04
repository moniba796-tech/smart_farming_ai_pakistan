# Deploying to Vercel (Free Hobby Tier)

This project deploys as **two separate Vercel projects** — one for the
backend API (serverless functions), one for the frontend (static build).
Both are free on Vercel's Hobby tier.

⚠️ **Read this first:** Vercel's Hobby plan is explicitly for **personal,
non-commercial** projects. If this app is going to be used commercially
(e.g. actual farmers using it, generating any revenue, or representing a
registered business), Vercel's terms require the paid Pro plan
($20/month) instead. Render's free tier and Railway's low-cost tier don't
have this same commercial-use restriction — worth knowing if this project
grows beyond a personal/demo stage.

---

## How the backend works on Vercel

Vercel runs Node backends as **serverless functions**, not a traditional
always-on server. This project is already structured for that:

- `backend/src/app.ts` — builds the Express app (no `.listen()` call)
- `backend/src/server.ts` — local dev only, calls `app.listen()`
- `backend/api/index.ts` — the actual Vercel entrypoint; wraps the same
  Express app as a serverless function
- `backend/src/config/db.ts` — caches the MongoDB connection across
  invocations so a "cold start" doesn't open a new connection every time
- `backend/vercel.json` — sets `maxDuration: 60` (the max allowed on
  Hobby without enabling Fluid Compute) so slower calls like disease
  detection have enough time to complete

You don't need to change any of this — it's already deploy-ready.

---

## Step 1: Deploy the backend

1. Push this project to GitHub (see the main README's GitHub section)
2. Go to **vercel.com** → **Add New... → Project**
3. Import your GitHub repo
4. **Root Directory:** set this to `backend` (important — Vercel needs to
   know this is a subfolder project, not the repo root)
5. Framework Preset: Vercel should auto-detect **Other** — that's fine,
   `vercel.json` handles the rest
6. **Environment Variables** — add all of these (same values as your local
   `backend/.env`):
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GROQ_API_KEY`
   - `GEMINI_API_KEY`
   - `HF_TOKEN` (optional, fallback)
   - `OPENWEATHER_API_KEY`
   - `NOMINATIM_USER_AGENT`
   - `CORS_ORIGIN` — set this to your **frontend's** Vercel URL once you
     have it from Step 2 (you can update this after both are deployed)
7. Click **Deploy**
8. Once deployed, copy the URL Vercel gives you, e.g.
   `https://smart-farming-backend.vercel.app`
9. Test it: visit `https://smart-farming-backend.vercel.app/api/health`
   in your browser — you should see a JSON response

## Step 2: Deploy the frontend

1. Back on Vercel → **Add New... → Project** → import the **same** repo
   again (Vercel lets you create multiple projects from one repo)
2. **Root Directory:** set this to `frontend`
3. Framework Preset: Vercel should auto-detect **Vite**
4. **Environment Variables:**
   - `VITE_API_URL` = your backend URL + `/api`, e.g.
     `https://smart-farming-backend.vercel.app/api`
   - `VITE_TUTORIAL_YOUTUBE_ID` (optional)
5. Click **Deploy**
6. Once deployed, copy the frontend's URL, e.g.
   `https://smart-farming-ai.vercel.app`

## Step 3: Connect them

Go back to your **backend** project's Vercel settings → Environment
Variables → update `CORS_ORIGIN` to your frontend's actual URL from Step
2 → redeploy the backend (Vercel → Deployments → click the three dots on
the latest deployment → Redeploy).

## Step 4: Seed the admin account

Vercel serverless functions can't run one-off scripts directly. Run the
admin seed script from your **local machine** instead, pointed at your
production database (the same `MONGODB_URI` you set on Vercel):

```bash
cd backend
# make sure your local .env has the SAME MONGODB_URI as your Vercel deployment
npm run seed:admin
```

This writes directly to your Atlas cluster, so it works regardless of
where the backend itself is hosted.

---

## Known limitations of this setup

- **Cold starts:** the first request after a period of inactivity will be
  slower (the function has to "wake up" and reconnect to MongoDB).
  Subsequent requests are fast.
- **Rate limiting:** `express-rate-limit`'s in-memory counter resets on
  every cold start, so it's a soft limit here, not a hard guarantee.
- **File uploads:** disease-detection image uploads go through Vercel's
  request body, which has a size limit (default ~4.5MB on Hobby) — this
  matches the app's existing 8MB multer limit reasonably well for typical
  phone photos, but very large images may be rejected by Vercel before
  reaching your code.

If any of these become a real problem at scale, Render or Railway (an
always-on traditional server, no serverless quirks) remain the simpler
choice — but for getting this live for free right now, this Vercel setup
works.
