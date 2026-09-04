import { Router } from "express";
import { weatherByCity, weatherByCoords, resolveLocation } from "../controllers/weatherController";

const router = Router();

// GET /api/weather/city?city=Faisalabad
router.get("/city", weatherByCity);

// GET /api/weather/coords?lat=..&lon=..   (used with the farmer's GPS)
router.get("/coords", weatherByCoords);

// GET /api/weather/location?lat=..&lon=..  -> district/province name (Nominatim)
router.get("/location", resolveLocation);

export default router;
