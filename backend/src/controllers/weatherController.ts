/**
 * controllers/weatherController.ts
 * -----------------------------------
 * Weather Intelligence + GPS location endpoints. Supports both a typed
 * city name (OpenWeather geocoding) and raw GPS coordinates from the
 * farmer's browser (navigator.geolocation on the frontend), which are
 * reverse-geocoded to a readable district/province via Nominatim.
 */

import { Request, Response } from "express";
import { getWeatherByCity, getWeatherByCoords } from "../services/weatherService";
import { reverseGeocodeGPS } from "../services/locationService";
import { asyncHandler } from "../middleware/errorHandler";

export const weatherByCity = asyncHandler(async (req: Request, res: Response) => {
  const { city } = req.query;
  if (typeof city !== "string" || !city.trim()) {
    res.status(400).json({ success: false, error: "Please provide a 'city' query parameter." });
    return;
  }
  const result = await getWeatherByCity(city);
  res.json(result);
});

export const weatherByCoords = asyncHandler(async (req: Request, res: Response) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    res.status(400).json({ success: false, error: "Please provide numeric 'lat' and 'lon' query parameters." });
    return;
  }
  const result = await getWeatherByCoords(lat, lon);
  res.json(result);
});

/** GPS -> district/province, used right after the browser's Geolocation API resolves. */
export const resolveLocation = asyncHandler(async (req: Request, res: Response) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    res.status(400).json({ success: false, error: "Please provide numeric 'lat' and 'lon' query parameters." });
    return;
  }
  const result = await reverseGeocodeGPS(lat, lon);
  res.json(result);
});
