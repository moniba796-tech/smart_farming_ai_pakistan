/**
 * api/client.ts
 * ---------------
 * Thin axios wrapper for every backend call the UI needs. Centralizing
 * this here means components never hardcode a URL or handle raw fetch
 * errors themselves — every function returns either the parsed success
 * payload or a `{ success: false, error }` shape the UI can render
 * directly.
 */

import axios from "axios";
import type {
  ApiError,
  ChatTurn,
  CropInputs,
  CropPrediction,
  DiseaseResult,
  LocationResult,
  WeatherResult,
  WeedEntry,
  MarketplaceResult,
  NearbyRetailer,
  RetailerRegistrationInput,
  AuthResponse,
  RegisterInput,
  LoginInput,
  AuthUser,
  AdminAnalytics,
  CropPricesResult,
} from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const http = axios.create({ baseURL: BASE_URL, timeout: 35000 });

const TOKEN_KEY = "sfa_auth_token";

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

// Attach the stored token (if any) to every outgoing request automatically,
// so components never need to manually pass Authorization headers.
http.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function extractError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (data?.error) return data as ApiError;
    if (err.code === "ECONNABORTED") {
      return { success: false, error: "The request took too long. Please try again." };
    }
    return { success: false, error: "Could not reach the server. Please check your connection." };
  }
  return { success: false, error: "Something went wrong. Please try again." };
}

// ---------------------------------------------------------------------------
// Disease detection
// ---------------------------------------------------------------------------
export async function analyzePlantImage(
  file: File,
  location?: { lat: number; lon: number }
): Promise<DiseaseResult | ApiError> {
  try {
    const form = new FormData();
    form.append("image", file);
    if (location) {
      form.append("lat", String(location.lat));
      form.append("lon", String(location.lon));
    }
    const { data } = await http.post<DiseaseResult | ApiError>("/disease/analyze", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Crop recommendation
// ---------------------------------------------------------------------------
export async function recommendCrop(inputs: CropInputs): Promise<CropPrediction | ApiError> {
  try {
    const { data } = await http.post<CropPrediction | ApiError>("/crop/recommend", inputs);
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Weeds
// ---------------------------------------------------------------------------
export async function getWeeds(crop?: string): Promise<WeedEntry[]> {
  try {
    const { data } = await http.get<{ success: true; weeds: WeedEntry[] }>("/weeds", {
      params: crop ? { crop } : {},
    });
    return data.weeds;
  } catch {
    return [];
  }
}

export async function getWeed(key: string): Promise<WeedEntry | ApiError> {
  try {
    const { data } = await http.get<{ success: true; weed: WeedEntry } | ApiError>(`/weeds/${key}`);
    if (data.success) return (data as { success: true; weed: WeedEntry }).weed;
    return data as ApiError;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Weather + GPS
// ---------------------------------------------------------------------------
export async function getWeatherByCity(city: string): Promise<WeatherResult | ApiError> {
  try {
    const { data } = await http.get<WeatherResult | ApiError>("/weather/city", { params: { city } });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherResult | ApiError> {
  try {
    const { data } = await http.get<WeatherResult | ApiError>("/weather/coords", { params: { lat, lon } });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function resolveLocation(lat: number, lon: number): Promise<LocationResult | ApiError> {
  try {
    const { data } = await http.get<LocationResult | ApiError>("/weather/location", { params: { lat, lon } });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// AI Chat Assistant
// ---------------------------------------------------------------------------
export async function sendChatMessage(
  message: string,
  history: ChatTurn[],
  sessionId?: string
): Promise<{ success: true; reply: string } | ApiError> {
  try {
    const { data } = await http.post<{ success: true; reply: string } | ApiError>("/chat/message", {
      message,
      history,
      sessionId,
    });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Marketplace — fertilizer recommendations + nearby retailers
// ---------------------------------------------------------------------------
export async function getFertilizerRecommendation(
  crop: string,
  location?: { lat: number; lon: number }
): Promise<MarketplaceResult | ApiError> {
  try {
    const { data } = await http.get<MarketplaceResult | ApiError>("/marketplace/fertilizer", {
      params: { crop, lat: location?.lat, lon: location?.lon },
    });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function getNearbyRetailers(
  lat: number,
  lon: number,
  radiusKm?: number
): Promise<NearbyRetailer[]> {
  try {
    const { data } = await http.get<{ success: true; retailers: NearbyRetailer[] }>("/marketplace/nearby", {
      params: { lat, lon, radiusKm },
    });
    return data.retailers;
  } catch {
    return [];
  }
}

export async function registerRetailer(
  input: RetailerRegistrationInput
): Promise<{ success: true; message: string; retailerId: string } | ApiError> {
  try {
    const { data } = await http.post<{ success: true; message: string; retailerId: string } | ApiError>(
      "/marketplace/retailers/register",
      input
    );
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export async function registerUser(input: RegisterInput): Promise<AuthResponse | ApiError> {
  try {
    const { data } = await http.post<AuthResponse | ApiError>("/auth/register", input);
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function loginUser(input: LoginInput): Promise<AuthResponse | ApiError> {
  try {
    const { data } = await http.post<AuthResponse | ApiError>("/auth/login", input);
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function fetchMe(): Promise<{ success: true; user: AuthUser } | ApiError> {
  try {
    const { data } = await http.get<{ success: true; user: AuthUser } | ApiError>("/auth/me");
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function updateMyProfile(
  updates: Partial<AuthUser>
): Promise<{ success: true; profile: AuthUser } | ApiError> {
  try {
    const { data } = await http.patch<{ success: true; profile: AuthUser } | ApiError>("/farmers/me", updates);
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export async function adminGetAnalytics(): Promise<{ success: true } & AdminAnalytics | ApiError> {
  try {
    const { data } = await http.get("/admin/analytics");
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function adminListRetailers(
  status: "pending" | "verified" | "all" = "pending"
): Promise<{ success: true; retailers: NearbyRetailer[] } | ApiError> {
  try {
    const { data } = await http.get("/admin/retailers", { params: { status } });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function adminVerifyRetailer(id: string): Promise<{ success: true } | ApiError> {
  try {
    const { data } = await http.patch(`/admin/retailers/${id}/verify`);
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function adminDeleteRetailer(id: string): Promise<{ success: true } | ApiError> {
  try {
    const { data } = await http.delete(`/admin/retailers/${id}`);
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function adminListFarmers(): Promise<{ success: true; farmers: AuthUser[] } | ApiError> {
  try {
    const { data } = await http.get("/admin/farmers");
    return data;
  } catch (err) {
    return extractError(err);
  }
}

// ---------------------------------------------------------------------------
// Crop prices
// ---------------------------------------------------------------------------
export async function getCropPrices(province: string): Promise<CropPricesResult | ApiError> {
  try {
    const { data } = await http.get<CropPricesResult | ApiError>("/prices", { params: { province } });
    return data;
  } catch (err) {
    return extractError(err);
  }
}

export async function listPriceProvinces(): Promise<string[]> {
  try {
    const { data } = await http.get<{ success: true; provinces: string[] }>("/prices/provinces");
    return data.provinces;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Health check (used by a small connectivity indicator in the UI)
// ---------------------------------------------------------------------------
export async function getHealth(): Promise<{
  success: boolean;
  db: string;
  groqConfigured: boolean;
  weatherConfigured: boolean;
  hfConfigured: boolean;
} | null> {
  try {
    const { data } = await http.get("/health");
    return data;
  } catch {
    return null;
  }
}
