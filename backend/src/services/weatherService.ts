/**
 * services/weatherService.ts
 * ----------------------------
 * OpenWeather API integration: geocode a city (or accept raw lat/lon from
 * GPS) and fetch current weather conditions.
 */

import axios from "axios";

const GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const REVERSE_GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/reverse";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const TIMEOUT_MS = 10000;

export interface WeatherResult {
  success: true;
  location: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  condition: string;
  windSpeedKmph: number;
  rainfallMm: number;
  lat: number;
  lon: number;
}

export interface WeatherError {
  success: false;
  error: string;
}

function hasWeatherKey(): boolean {
  return !!process.env.OPENWEATHER_API_KEY;
}

function windDescription(kmph: number): string {
  if (kmph < 5) return "Calm";
  if (kmph < 20) return "Light breeze";
  if (kmph < 40) return "Moderate wind";
  return "Strong wind - take precautions";
}

async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherResult | WeatherError> {
  if (!hasWeatherKey()) {
    return { success: false, error: "Weather service is not configured (OPENWEATHER_API_KEY missing)." };
  }
  try {
    const { data } = await axios.get(WEATHER_URL, {
      params: { lat, lon, appid: process.env.OPENWEATHER_API_KEY, units: "metric" },
      timeout: TIMEOUT_MS,
    });
    const windMs = data?.wind?.speed ?? 0;
    const windKmph = Math.round(windMs * 3.6 * 10) / 10;

    return {
      success: true,
      location: data.name || "Unknown",
      temperature: Math.round(data.main.temp * 10) / 10,
      feelsLike: Math.round(data.main.feels_like * 10) / 10,
      humidity: data.main.humidity,
      condition: data.weather?.[0]?.description
        ? data.weather[0].description.replace(/\b\w/g, (c: string) => c.toUpperCase())
        : "N/A",
      windSpeedKmph: windKmph,
      rainfallMm: data.rain?.["1h"] ?? 0,
      lat,
      lon,
    };
  } catch (err) {
    return { success: false, error: "Could not fetch weather for this location." };
  }
}

export async function getWeatherByCity(cityName: string): Promise<WeatherResult | WeatherError> {
  if (!cityName?.trim()) return { success: false, error: "Please provide a location." };
  if (!hasWeatherKey()) {
    return { success: false, error: "Weather service is not configured (OPENWEATHER_API_KEY missing)." };
  }

  try {
    const { data } = await axios.get(GEOCODE_URL, {
      params: { q: `${cityName.trim()},PK`, limit: 1, appid: process.env.OPENWEATHER_API_KEY },
      timeout: TIMEOUT_MS,
    });
    if (!data?.length) {
      return { success: false, error: `Could not find location '${cityName}' in Pakistan.` };
    }
    const result = await fetchWeatherByCoords(data[0].lat, data[0].lon);
    if (result.success) result.location = data[0].name || cityName;
    return result;
  } catch (err) {
    return { success: false, error: "Geocoding service error. Please try again." };
  }
}

/** Used for GPS-based lookups: farmer's browser gives raw lat/lon directly. */
export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherResult | WeatherError> {
  return fetchWeatherByCoords(lat, lon);
}

/** Reverse-geocode GPS coordinates to a human-readable place name (OpenWeather). */
export async function reverseGeocode(lat: number, lon: number): Promise<{ name: string; province?: string } | null> {
  if (!hasWeatherKey()) return null;
  try {
    const { data } = await axios.get(REVERSE_GEOCODE_URL, {
      params: { lat, lon, limit: 1, appid: process.env.OPENWEATHER_API_KEY },
      timeout: TIMEOUT_MS,
    });
    if (!data?.length) return null;
    return { name: data[0].name, province: data[0].state };
  } catch {
    return null;
  }
}
