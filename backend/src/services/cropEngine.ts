/**
 * services/cropEngine.ts
 * ------------------------
 * A transparent, dependency-free crop recommendation engine.
 *
 * Approach: for each candidate crop we know its agronomic "comfort range"
 * for N, P, K, temperature, humidity, and rainfall (see data/cropData.ts,
 * derived from real agronomic guidance for Pakistani conditions). We
 * compute how far the farmer's actual soil/climate inputs sit outside
 * each crop's ideal range (0 if inside the range), normalize by feature,
 * and convert the combined distance into a similarity score via a
 * softmax-style transform. The crop with the highest score is the
 * recommendation; the next two form the "alternatives" list.
 *
 * This avoids depending on a paid ML hosting service or bundling a large
 * trained model binary, while still being explainable and easy to tune —
 * every constant here is inspectable and editable. If you want a formally
 * trained classifier instead, `ml-random-forest` (npm, free/MIT) can be
 * trained from data/cropData.ts-derived samples at server startup.
 */

import { CROP_RANGES, CROP_GUIDE, CropRange } from "../data/cropData";

export interface CropInputs {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface CropPrediction {
  crop: string;
  confidence: number; // 0-1
  season: string;
  water: string;
  fertilizer: string;
  sowing: string;
  harvest: string;
  expectedYield: string;
  urduSummary: string;
  alternatives: { crop: string; confidence: number }[];
}

const FEATURE_KEYS: (keyof Omit<CropRange, "crop">)[] = [
  "N",
  "P",
  "K",
  "temperature",
  "humidity",
  "rainfall",
];

/** Distance of `value` outside [low, high], 0 if inside the range. */
function outOfRangeDistance(value: number, [low, high]: [number, number]): number {
  if (value < low) return low - value;
  if (value > high) return value - high;
  return 0;
}

/** Range width, used to normalize each feature's distance to a comparable scale. */
function rangeWidth([low, high]: [number, number]): number {
  return Math.max(high - low, 1e-6);
}

function inputValue(inputs: CropInputs, key: keyof Omit<CropRange, "crop">): number {
  switch (key) {
    case "N":
      return inputs.nitrogen;
    case "P":
      return inputs.phosphorus;
    case "K":
      return inputs.potassium;
    case "temperature":
      return inputs.temperature;
    case "humidity":
      return inputs.humidity;
    case "rainfall":
      return inputs.rainfall;
  }
}

function scoreCrop(inputs: CropInputs, range: CropRange): number {
  let totalNormalizedDistance = 0;
  for (const key of FEATURE_KEYS) {
    const dist = outOfRangeDistance(inputValue(inputs, key), range[key]);
    totalNormalizedDistance += dist / rangeWidth(range[key]);
  }
  // Average normalized distance across all 6 features (lower = better fit)
  return totalNormalizedDistance / FEATURE_KEYS.length;
}

export function predictCrop(inputs: CropInputs): CropPrediction {
  const scored = CROP_RANGES.map((range) => ({
    crop: range.crop,
    distance: scoreCrop(inputs, range),
  }));

  // Convert distances to a softmax-style similarity score so all
  // confidences sum to 1 and the best-fitting crop gets the highest value.
  const temperature = 1.5; // softmax sharpness constant
  const negDistances = scored.map((s) => -s.distance * temperature);
  const maxNeg = Math.max(...negDistances);
  const expScores = negDistances.map((v) => Math.exp(v - maxNeg));
  const sumExp = expScores.reduce((a, b) => a + b, 0);
  const confidences = expScores.map((v) => v / sumExp);

  const ranked = scored
    .map((s, i) => ({ crop: s.crop, confidence: confidences[i] }))
    .sort((a, b) => b.confidence - a.confidence);

  const top = ranked[0];
  const guide = CROP_GUIDE[top.crop] ?? {
    season: "Consult local agriculture office for the best season.",
    water: "Moderate - monitor soil moisture regularly.",
    fertilizer: "Get a soil test for precise fertilizer recommendation.",
    sowing: "Follow standard row sowing practices for your region.",
    harvest: "Varies by variety and local climate.",
    yield: "Varies by region and management practices.",
    urduSummary: "بہترین موسم اور طریقہ کاشت جاننے کے لیے اپنے مقامی زرعی دفتر سے رابطہ کریں۔",
  };

  return {
    crop: top.crop.charAt(0).toUpperCase() + top.crop.slice(1),
    confidence: top.confidence,
    season: guide.season,
    water: guide.water,
    fertilizer: guide.fertilizer,
    sowing: guide.sowing,
    harvest: guide.harvest,
    expectedYield: guide.yield,
    urduSummary: guide.urduSummary,
    alternatives: ranked.slice(1, 4).map((r) => ({
      crop: r.crop.charAt(0).toUpperCase() + r.crop.slice(1),
      confidence: r.confidence,
    })),
  };
}
