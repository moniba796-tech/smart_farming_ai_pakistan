/**
 * services/locationService.ts
 * ------------------------------
 * Free, keyless reverse-geocoding via OpenStreetMap's Nominatim API — used
 * to turn a farmer's raw GPS coordinates (from the browser Geolocation API)
 * into a readable district/province name for their profile and reports.
 *
 * Nominatim's usage policy requires a descriptive User-Agent and asks
 * callers not to send excessive request volume — fine for this app's
 * "look up my location once" use case.
 */

import axios from "axios";

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse";
const TIMEOUT_MS = 10000;

export interface ReverseGeocodeResult {
  success: true;
  displayName: string;
  district?: string;
  province?: string;
  country?: string;
}

export interface ReverseGeocodeError {
  success: false;
  error: string;
}

export async function reverseGeocodeGPS(
  lat: number,
  lon: number
): Promise<ReverseGeocodeResult | ReverseGeocodeError> {
  try {
    const { data } = await axios.get(NOMINATIM_URL, {
      params: { lat, lon, format: "jsonv2", addressdetails: 1 },
      timeout: TIMEOUT_MS,
      headers: {
        "User-Agent": process.env.NOMINATIM_USER_AGENT || "smart-farming-ai-pakistan/1.0",
      },
    });

    if (!data) {
      return { success: false, error: "Could not resolve this location." };
    }

    const addr = data.address || {};
    return {
      success: true,
      displayName: data.display_name || "Unknown location",
      district: addr.county || addr.city_district || addr.state_district || addr.city,
      province: addr.state,
      country: addr.country,
    };
  } catch (err) {
    return { success: false, error: "Location lookup service is temporarily unavailable." };
  }
}
