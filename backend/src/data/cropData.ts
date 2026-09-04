/**
 * data/cropData.ts
 * ------------------
 * Agronomic reference ranges (N, P, K, temperature, humidity, rainfall)
 * for major Pakistani crops, plus farmer-friendly guidance (season, water,
 * fertilizer, sowing method, harvest time, expected yield).
 *
 * Used by services/cropEngine.ts as the basis for a transparent
 * nearest-centroid recommendation algorithm (see that file for details).
 */

export interface CropRange {
  crop: string;
  N: [number, number];
  P: [number, number];
  K: [number, number];
  temperature: [number, number];
  humidity: [number, number];
  rainfall: [number, number];
}

export const CROP_RANGES: CropRange[] = [
  { crop: "rice", N: [80, 120], P: [35, 60], K: [35, 55], temperature: [24, 35], humidity: [70, 90], rainfall: [150, 300] },
  { crop: "wheat", N: [90, 130], P: [40, 65], K: [30, 50], temperature: [10, 25], humidity: [40, 65], rainfall: [30, 100] },
  { crop: "cotton", N: [100, 140], P: [40, 70], K: [40, 65], temperature: [25, 38], humidity: [45, 70], rainfall: [60, 150] },
  { crop: "sugarcane", N: [100, 140], P: [45, 75], K: [45, 75], temperature: [24, 38], humidity: [65, 90], rainfall: [150, 300] },
  { crop: "maize", N: [70, 110], P: [35, 60], K: [30, 55], temperature: [20, 32], humidity: [50, 75], rainfall: [80, 200] },
  { crop: "chickpea", N: [10, 40], P: [40, 65], K: [15, 35], temperature: [15, 28], humidity: [30, 55], rainfall: [20, 70] },
  { crop: "mango", N: [50, 90], P: [30, 55], K: [40, 70], temperature: [22, 38], humidity: [45, 70], rainfall: [50, 150] },
  { crop: "potato", N: [80, 120], P: [50, 80], K: [60, 100], temperature: [12, 24], humidity: [55, 80], rainfall: [40, 120] },
];

export interface CropGuide {
  season: string;
  water: string;
  fertilizer: string;
  sowing: string;
  harvest: string;
  yield: string;
  /** Urdu-language summary: season/water/fertilizer + practical recommendation, for farmers who read Urdu. */
  urduSummary: string;
}

export const CROP_GUIDE: Record<string, CropGuide> = {
  rice: {
    season: "Kharif (April - July sowing)",
    water: "High - requires standing water / flooded fields",
    fertilizer: "Urea + DAP; apply nitrogen in 3 split doses",
    sowing: "Transplant nursery seedlings into puddled fields",
    harvest: "~120-150 days after sowing",
    yield: "2.5 - 3.5 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "چاول کھریف کے موسم (اپریل-جولائی) میں لگایا جاتا ہے اور اسے کھڑے پانی کی ضرورت ہوتی ہے۔ یوریا اور ڈی اے پی کھاد نائٹروجن کو 3 حصوں میں دیں۔ پنیری کو تیار کھیت میں منتقل کریں۔ سفارش: پانی کی سطح کو مستقل برقرار رکھیں اور 120-150 دن بعد کٹائی کریں۔",
  },
  wheat: {
    season: "Rabi (November - December sowing)",
    water: "Moderate - 4 to 6 irrigations per season",
    fertilizer: "DAP at sowing, Urea as top dressing at first irrigation",
    sowing: "Drill sowing in rows, 6-inch spacing recommended",
    harvest: "~120-140 days after sowing (April harvest)",
    yield: "1.2 - 1.8 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "گندم ربیع کے موسم (نومبر-دسمبر) میں بوئی جاتی ہے اور اسے 4 سے 6 بار پانی کی ضرورت ہوتی ہے۔ بوائی کے وقت ڈی اے پی اور پہلی آبپاشی پر یوریا ڈالیں۔ سفارش: قطاروں میں بوائی کریں اور اپریل میں کٹائی کے لیے تیار رہیں۔",
  },
  cotton: {
    season: "Kharif (May sowing)",
    water: "Moderate - avoid waterlogging",
    fertilizer: "Balanced NPK, extra potash during boll formation",
    sowing: "Ridge sowing, 75cm row spacing",
    harvest: "Picking starts ~150 days after sowing, multiple pickings",
    yield: "0.8 - 1.2 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "کپاس مئی میں بوئی جاتی ہے، پانی کھڑا ہونے سے بچائیں۔ ٹینڈے بننے کے وقت پوٹاش کھاد زیادہ دیں۔ سفارش: مینڈوں پر بوائی کریں اور تقریباً 150 دن بعد چنائی شروع کریں، کئی بار چنائی کی ضرورت ہوگی۔",
  },
  sugarcane: {
    season: "Spring (Feb-March) or Autumn (Sept-Oct)",
    water: "High - frequent irrigation needed",
    fertilizer: "Heavy nitrogen requirement, split into 3-4 doses",
    sowing: "Sett (stem cutting) planting in furrows",
    harvest: "10-12 months after planting",
    yield: "25 - 35 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "گنا بہار (فروری-مارچ) یا خزاں (ستمبر-اکتوبر) میں لگایا جاتا ہے اور اسے بار بار پانی درکار ہوتا ہے۔ نائٹروجن کھاد 3-4 حصوں میں دیں۔ سفارش: قلمیں نالیوں میں لگائیں اور 10-12 ماہ بعد کٹائی کریں۔",
  },
  maize: {
    season: "Kharif (July) or Spring (Feb)",
    water: "Moderate - critical at flowering stage",
    fertilizer: "Balanced NPK with split nitrogen doses",
    sowing: "Row sowing, 75cm x 20cm spacing",
    harvest: "~90-110 days after sowing",
    yield: "1.5 - 2.5 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "مکئی کھریف (جولائی) یا بہار (فروری) میں بوئی جاتی ہے، پھول آنے کے وقت پانی بہت ضروری ہے۔ نائٹروجن کھاد کو حصوں میں تقسیم کریں۔ سفارش: قطاروں میں بوائی کریں اور 90-110 دن بعد کٹائی کے لیے تیار رہیں۔",
  },
  chickpea: {
    season: "Rabi (October - November sowing)",
    water: "Low - mostly rainfed, 1-2 irrigations if needed",
    fertilizer: "Light phosphorus dose at sowing",
    sowing: "Line sowing with proper seed treatment",
    harvest: "~150-160 days after sowing",
    yield: "0.4 - 0.7 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "چنا ربیع کے موسم (اکتوبر-نومبر) میں بویا جاتا ہے، زیادہ تر بارش پر انحصار کرتا ہے، صرف 1-2 بار پانی کافی ہے۔ بوائی پر ہلکی فاسفورس کھاد دیں۔ سفارش: بیج کو دوا لگا کر بوئیں اور 150-160 دن بعد کٹائی کریں۔",
  },
  mango: {
    season: "Perennial - flowering Feb-March, harvest May-August",
    water: "Moderate - deep but infrequent irrigation",
    fertilizer: "Organic manure + balanced NPK annually",
    sowing: "Grafted saplings planted at start of monsoon",
    harvest: "May - August depending on variety",
    yield: "Varies by orchard age; mature trees 40-80 kg/tree",
    urduSummary:
      "آم کا درخت سدا بہار ہے، پھول فروری-مارچ میں آتا ہے اور پھل مئی سے اگست تک تیار ہوتا ہے۔ گہرا مگر کم بار پانی دیں۔ سفارش: قلمی پودے مون سون کے شروع میں لگائیں اور ہر سال نامیاتی کھاد کے ساتھ متوازن کھاد دیں۔",
  },
  potato: {
    season: "Autumn (Sept-Oct) or Spring (Jan-Feb)",
    water: "Moderate - regular light irrigation",
    fertilizer: "Balanced NPK with extra potash for tuber growth",
    sowing: "Tuber planting in ridges, 25-30cm spacing",
    harvest: "~90-120 days after sowing",
    yield: "3 - 5 tons/acre (avg Pakistan conditions)",
    urduSummary:
      "آلو خزاں (ستمبر-اکتوبر) یا بہار (جنوری-فروری) میں لگایا جاتا ہے، تھوڑا تھوڑا مگر باقاعدہ پانی دیں۔ غدود کی نشوونما کے لیے پوٹاش کھاد زیادہ دیں۔ سفارش: مینڈوں پر بیج آلو لگائیں اور 90-120 دن بعد کھدائی کریں۔",
  },
};
