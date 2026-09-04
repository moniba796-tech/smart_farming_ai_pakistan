/**
 * hooks/useGeolocation.ts
 * -------------------------
 * Wraps the browser's native Geolocation API and, on success, resolves
 * the coordinates to a human-readable district/province via the backend
 * (which uses free Nominatim reverse-geocoding). This powers the
 * "Use my location" button across the app — no typing a city name needed.
 */

import { useCallback, useState } from "react";
import { resolveLocation } from "@/api/client";
import type { LocationResult } from "@/types";

export interface GeoState {
  status: "idle" | "locating" | "resolving" | "success" | "error";
  lat?: number;
  lon?: number;
  place?: LocationResult;
  error?: string;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "idle" });

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "error", error: "Your browser does not support GPS location." });
      return;
    }

    setState({ status: "locating" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setState({ status: "resolving", lat: latitude, lon: longitude });

        const result = await resolveLocation(latitude, longitude);
        if (result.success) {
          setState({ status: "success", lat: latitude, lon: longitude, place: result as LocationResult });
        } else {
          // Coordinates are still useful even if the place-name lookup failed.
          setState({
            status: "success",
            lat: latitude,
            lon: longitude,
            error: "Got your coordinates, but could not resolve a place name.",
          });
        }
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Location permission was denied. Please allow location access, or enter your city manually."
            : "Could not get your location. Please try again or enter your city manually.";
        setState({ status: "error", error: message });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  }, []);

  const reset = useCallback(() => setState({ status: "idle" }), []);

  return { ...state, locate, reset };
}
