/**
 * services/marketplaceService.ts
 * ---------------------------------
 * Two responsibilities:
 * 1. Find retailers nearest to a farmer's GPS coordinates (MongoDB
 *    geospatial $near query — requires the 2dsphere index on
 *    Retailer.location, see models/Retailer.ts).
 * 2. Register a new retailer's interest to join the marketplace (starts
 *    unverified; see the model's doc comment for why).
 */

import { Retailer, ProductCategory } from "../models/Retailer";
import { isDBConnected } from "../config/db";
import { getFertilizerRecommendation, FertilizerRecommendation } from "../data/fertilizerData";

export interface NearbyRetailerResult {
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

interface FindNearbyOptions {
  lat: number;
  lon: number;
  radiusKm?: number;
  category?: ProductCategory;
  verifiedOnly?: boolean;
  limit?: number;
}

/**
 * Find retailers near a GPS point, sorted nearest-first. Returns an empty
 * array (not an error) when the database isn't connected or no retailers
 * exist yet — the marketplace UI should show a friendly "no retailers
 * near you yet" state, not a crash, since this is a brand-new feature
 * with an initially empty retailer list.
 */
export async function findNearbyRetailers(options: FindNearbyOptions): Promise<NearbyRetailerResult[]> {
  if (!isDBConnected()) return [];

  const { lat, lon, radiusKm = 50, category, verifiedOnly = true, limit = 20 } = options;

  const filter: Record<string, unknown> = {
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lon, lat] },
        $maxDistance: radiusKm * 1000, // meters
      },
    },
  };
  if (category) filter.productCategories = category;
  if (verifiedOnly) filter.verified = true;

  const retailers = await Retailer.find(filter).limit(limit);

  return retailers.map((r) => {
    const [rLon, rLat] = r.location.coordinates;
    return {
      id: r.id,
      businessName: r.businessName,
      ownerName: r.ownerName,
      phone: r.phone,
      city: r.city,
      address: r.address,
      lat: rLat,
      lon: rLon,
      distanceKm: Math.round(haversineKm(lat, lon, rLat, rLon) * 10) / 10,
      productCategories: r.productCategories,
      productsOffered: r.productsOffered,
      verified: r.verified,
    };
  });
}

export interface RegisterRetailerInput {
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

export async function registerRetailer(input: RegisterRetailerInput) {
  const retailer = await Retailer.create({
    businessName: input.businessName,
    ownerName: input.ownerName,
    phone: input.phone,
    email: input.email,
    city: input.city,
    address: input.address,
    location: { type: "Point", coordinates: [input.lon, input.lat] },
    productCategories: input.productCategories,
    productsOffered: input.productsOffered ?? "",
    verified: false,
  });
  return retailer;
}

/** Combines the generic fertilizer knowledge base with real nearby retailers. */
export async function getMarketplaceRecommendation(
  crop: string,
  lat?: number,
  lon?: number
): Promise<{ fertilizers: FertilizerRecommendation[]; nearbyRetailers: NearbyRetailerResult[] }> {
  const fertilizers = getFertilizerRecommendation(crop);
  const nearbyRetailers =
    lat !== undefined && lon !== undefined
      ? await findNearbyRetailers({ lat, lon, category: "fertilizer" })
      : [];
  return { fertilizers, nearbyRetailers };
}

/** Standard great-circle distance between two lat/lon points, in kilometers. */
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
