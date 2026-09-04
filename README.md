# 🌾 Smart Farming AI Pakistan — TypeScript Edition

A production-style, full-stack rebuild of Smart Farming AI Pakistan:

- **Frontend:** React + TypeScript + Tailwind CSS + Framer Motion (animations) + react-leaflet (map)
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB Atlas (via Mongoose)
- **AI / Data:** Groq (chat), Google Gemini (disease detection), OpenWeather
  (weather), OpenStreetMap Nominatim (free GPS reverse-geocoding) — **all free-tier services**

Supports English, Urdu, and Roman Urdu. Farmer-friendly language throughout.

## 📁 Project Structure

```
smart-farming-ts/
├── backend/            # Express + TypeScript API + MongoDB Atlas models
│   └── src/
│       ├── config/db.ts
│       ├── controllers/
│       ├── data/            # crop/weed/disease knowledge bases (typed data)
│       ├── middleware/
│       ├── models/          # Mongoose schemas
│       ├── routes/
│       ├── services/        # cropEngine, diseaseService, groqService, weatherService, locationService
│       ├── types/
│       └── server.ts
└── frontend/            # React + TypeScript + Tailwind + Framer Motion
    └── src/
        ├── api/client.ts     # all backend calls, one place
        ├── components/       # Navbar, Hero, cards, chat window, map, illustrations
        ├── hooks/            # useGeolocation (GPS), useSpeechRecognition (voice)
        ├── pages/            # Home, DiseaseDetection, CropAdvisor, WeedManagement, AIAssistant
        └── App.tsx
```

## ✨ Features

| Feature | How it works |
|---|---|
| 🌱 Disease Detection | Upload a photo → Google Gemini (`gemini-2.5-flash`) diagnoses it directly — plant ID, symptoms, causes, organic/chemical treatment, and prevention, all in one call. Automatically falls back to a free Hugging Face image classifier if Gemini is unreachable or not configured |
| 🌾 Crop Advisor | Enter soil/climate data (or auto-fill via GPS + weather) → a transparent, dependency-free recommendation engine suggests the best crop with reasoning |
| 🌿 Weed Management | Curated knowledge base of major Pakistani weeds — yield-loss impact, role in hosting pests/diseases, and cultural/mechanical/chemical control, filterable by crop |
| 🤖 AI Assistant | Chat powered by Groq, with a farming-specific system prompt (English/Urdu/Roman Urdu) |
| 📍 GPS Location | Browser Geolocation API → reverse-geocoded to district/province via free OpenStreetMap Nominatim — no typing a city needed |
| 🎙️ Voice Input | Browser's native Web Speech API — free, runs client-side, no backend call |
| 🗺️ Map | Interactive Pakistan map (react-leaflet) with agricultural regions highlighted and a pin for your searched/GPS location |
| 🎨 Animated UI | Framer Motion throughout — floating/swaying hero illustration (hand-drawn original SVG farmer scene, not a stock photo), animated icons, staggered card reveals, confidence-bar fill animations |
| 💾 MongoDB Atlas | Farmer profiles (with GPS location), disease scan history, crop recommendation history, and chat history — all persisted, with the app degrading gracefully if the DB isn't connected |
| 🌐 Bilingual UI | A language toggle switches the whole interface (nav, hero, footer, page headers) between English and Urdu; every crop and weed report includes a genuine Urdu summary with a recommended solution |
| 🛒 Marketplace | Get the right fertilizer for a crop (dosage, timing, price range) and find real nearby retailers via MongoDB geospatial search on GPS coordinates |
| 🏪 Retailer Sign-up | A public form for fertilizer/pesticide/seed shops to register interest in joining the marketplace (starts unverified, pending review) |
| 📺 How-to-Use Guide | A bilingual, animated step-by-step walkthrough of every feature, plus a video player ready to embed a recorded Urdu tutorial (full script included in `docs/urdu-tutorial-script.md`) |
| 🔐 Auth & Dashboards | Farmers register/log in with email + phone + password; a seeded admin account (`admin@gmail.com` / `admin123`) accesses a separate Admin Dashboard |
| 👨‍🌾 Farmer Dashboard | Edit profile, farm size, primary crops, and GPS location; quick links to scan history, crop advisor, and marketplace |
| 🛠️ Admin Dashboard | Retailer verification queue (approve/remove new shop sign-ups), farmer count, and analytics (top diagnosed diseases, top recommended crops) |
| 💰 Crop Market Prices | Search by province (Punjab, Sindh, KP, Balochistan) for indicative crop price ranges, each with a farmer-friendly Urdu note |

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env       # fill in your keys — see below
npm run dev                 # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev                 # http://localhost:5173
```

Vite's dev server proxies `/api` requests to your backend automatically
(see `vite.config.ts`), so you don't need CORS configuration for local dev.

## 🔑 Environment Variables (Backend)

All free-tier — no credit card required for any of them.

| Variable | Powers | Get it from |
|---|---|---|
| `MONGODB_URI` | Farmer profiles, scan/recommendation/chat history | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) → free M0 cluster → Database → Connect → Drivers |
| `GROQ_API_KEY` | AI Assistant chat | [console.groq.com/keys](https://console.groq.com/keys) |
| `GEMINI_API_KEY` | Disease detection | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — free tier, no card needed |
| `HF_TOKEN` | Optional — automatic fallback for disease detection if Gemini fails or isn't configured (raises free-tier rate limits) | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |
| `OPENWEATHER_API_KEY` | Weather auto-fill | [openweathermap.org/api](https://openweathermap.org/api) |

GPS reverse-geocoding (district/province lookup) uses OpenStreetMap's
Nominatim service, which is **free and needs no API key** — just a
descriptive `NOMINATIM_USER_AGENT`, already set in `.env.example`.

If any key is missing, that specific feature returns a clear in-app error —
the rest of the app keeps working normally.

## 🧠 How the Crop Recommendation Works (No Paid ML Hosting Needed)

Instead of shipping a large trained model binary or depending on a paid ML
API, `backend/src/services/cropEngine.ts` implements a transparent
nearest-range algorithm: each crop has a known agronomic "comfort range" for
N/P/K/temperature/humidity/rainfall. The farmer's inputs are scored by how
far outside each crop's ideal range they fall, converted to a similarity
score via softmax, and the best-fitting crop (plus runners-up) is returned.
Every constant is inspectable and tunable in `backend/src/data/cropData.ts`.

## 🗄️ MongoDB Atlas Setup

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free **M0** cluster
3. **Database Access** → add a database user (username/password)
4. **Network Access** → add `0.0.0.0/0` (allow from anywhere) for development,
   or your specific deploy host's IP for production
5. **Database → Connect → Drivers** → copy the connection string into
   `MONGODB_URI` in `backend/.env`
6. Verify it works:
   ```bash
   cd backend
   npm run seed
   ```
   This connects, verifies all Mongoose model indexes, and prints current
   collection counts — it doesn't insert fake data, since the crop/weed/
   disease knowledge bases are static TypeScript data, not DB-seeded content.
7. Create the admin account:
   ```bash
   npm run seed:admin
   ```
   This creates (or resets) the admin login:
   - **Email:** `admin@gmail.com`
   - **Password:** `admin123`

   ⚠️ Change this password in any real deployment — it's a development
   placeholder. Log in at `/login` with these credentials to reach the
   Admin Dashboard at `/dashboard`.

## 🔐 Authentication

- Farmers sign up at `/register` with **name, email, phone, and password**
  — both email and phone are stored, and either can be used to log in
  (the `identifier` field on `/login` accepts both).
- Sessions use a JWT stored in the browser's localStorage, attached
  automatically to every API request by `frontend/src/api/client.ts`.
- Set a real `JWT_SECRET` in `backend/.env` before deploying (a long random
  string — e.g. generate one with `openssl rand -hex 32`).
- `/dashboard` shows the Farmer Dashboard for `role: "farmer"` accounts and
  the Admin Dashboard for `role: "admin"` accounts automatically.

## ✅ Testing

```bash
# Backend: type-check + build
cd backend && npm run lint && npm run build

# Frontend: type-check + build
cd frontend && npm run lint && npm run build
```

Manual checklist:
- [ ] Upload a leaf/fruit photo on Disease Detection → get a report card
- [ ] Tap "Use My GPS Location" on Crop Advisor → weather auto-fills → get a crop recommendation
- [ ] Filter weeds by crop on Weed Management → select a weed → see the full report
- [ ] Chat with the AI Assistant in English, Urdu, and Roman Urdu
- [ ] Tap the mic button and speak a question → text appears in the chat input
- [ ] Stop MongoDB / remove `MONGODB_URI` → confirm history features fail gracefully, core features still work

## 🚢 Deployment Notes

The backend can run either as a traditional always-on Node server (Render,
Railway, a VPS) or as Vercel serverless functions — both are supported out
of the box:

- **Traditional host (Render/Railway/VPS):** `npm run build && npm start`
  runs `dist/server.js`, a normal persistent Express server.
- **Vercel (free Hobby tier):** deploy the `backend` folder as its own
  Vercel project — `backend/api/index.ts` + `backend/vercel.json` are
  already set up for this. See **[docs/vercel-deployment.md](docs/vercel-deployment.md)**
  for the full step-by-step guide, including the two-project setup
  (backend + frontend), environment variables, and known serverless
  limitations (cold starts, soft rate limits).

The frontend is a static build (`frontend/dist`) deployable to Vercel,
Netlify, or Cloudflare Pages. Point its `VITE_API_URL` at your deployed
backend's public URL + `/api`.

## 📄 License

MIT. Built for Pakistani farmers 🇵🇰
"# smart_farming_ai_pakistan" 
