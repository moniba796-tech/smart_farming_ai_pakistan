export interface DiseaseResult {
  success: true;
  method?: "gemini" | "huggingface";
  rawLabel: string;
  confidence: number;
  name: string;
  symptoms: string;
  causes: string;
  organicTreatment: string;
  chemicalTreatment: string;
  prevention: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

export interface CropInputs {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  lat?: number;
  lon?: number;
}

export interface CropPrediction {
  success: true;
  crop: string;
  confidence: number;
  season: string;
  water: string;
  fertilizer: string;
  sowing: string;
  harvest: string;
  expectedYield: string;
  urduSummary: string;
  alternatives: { crop: string; confidence: number }[];
}

export interface WeedEntry {
  key: string;
  nameEn: string;
  nameUrdu: string;
  nameRomanUrdu: string;
  type: string;
  affectedCrops: string[];
  identification: string;
  yieldLoss: string;
  pestDiseaseHostRole: string;
  criticalPeriod: string;
  controlCultural: string;
  controlMechanical: string;
  controlChemical: string;
  prevention: string;
  urduSummary: string;
}

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

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface LocationResult {
  success: true;
  displayName: string;
  district?: string;
  province?: string;
  country?: string;
}

export type Language = "english" | "urdu" | "roman_urdu";

export interface FertilizerRecommendation {
  name: string;
  type: string;
  purpose: string;
  dosagePerAcre: string;
  timing: string;
  approxPriceRangePKR: string;
  urduNote: string;
}

export type ProductCategory = "fertilizer" | "pesticide" | "seeds" | "equipment" | "other";

export interface NearbyRetailer {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  city: string;
  address?: string;
  lat: number;
  lon: number;
  distanceKm: number;
  productCategories: ProductCategory[];
  productsOffered: string;
  verified: boolean;
}

export interface MarketplaceResult {
  success: true;
  fertilizers: FertilizerRecommendation[];
  nearbyRetailers: NearbyRetailer[];
  note?: string;
}

export interface RetailerRegistrationInput {
  businessName: string;
  ownerName: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  lat: number;
  lon: number;
  productCategories: ProductCategory[];
  productsOffered?: string;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export type UserRole = "farmer" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredLanguage?: Language;
  location?: {
    lat: number;
    lon: number;
    district?: string;
    province?: string;
    displayName?: string;
  };
  farmSizeAcres?: number;
  primaryCrops?: string[];
}

export interface AuthResponse {
  success: true;
  token: string;
  user: AuthUser;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  preferredLanguage?: Language;
}

export interface LoginInput {
  identifier: string; // email or phone
  password: string;
}

export interface AdminAnalytics {
  totals: {
    farmerCount: number;
    scanCount: number;
    cropRecCount: number;
    pendingRetailers: number;
    verifiedRetailers: number;
  };
  topDiseases: { name: string; count: number }[];
  topCrops: { name: string; count: number }[];
}

// ---------------------------------------------------------------------------
// Crop prices
// ---------------------------------------------------------------------------
export interface CropPriceEntry {
  crop: string;
  unit: string;
  priceRangePKR: string;
  note: string;
  urduNote: string;
}

export interface CropPricesResult {
  success: true;
  province: string;
  prices: CropPriceEntry[];
  note?: string;
  availableProvinces?: string[];
}

