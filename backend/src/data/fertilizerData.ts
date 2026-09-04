/**
 * data/fertilizerData.ts
 * ------------------------
 * Which fertilizer products best suit each crop, with practical dosage
 * and timing guidance. This is generic agronomic knowledge (not tied to
 * any specific retailer's inventory or pricing) — the marketplace layer
 * (see services/marketplaceService.ts) combines this with real nearby
 * Retailer documents from MongoDB Atlas to answer "what should I buy,
 * and where can I get it near me".
 */

export interface FertilizerRecommendation {
  name: string;
  type: "Nitrogen" | "Phosphorus" | "Potassium" | "Compound/NPK" | "Organic";
  purpose: string;
  dosagePerAcre: string;
  timing: string;
  approxPriceRangePKR: string; // wide ranges — prices fluctuate; a real retailer's listing overrides this
  urduNote: string;
}

export const FERTILIZER_GUIDE: Record<string, FertilizerRecommendation[]> = {
  wheat: [
    {
      name: "DAP (Di-Ammonium Phosphate)",
      type: "Phosphorus",
      purpose: "Strong root development at sowing stage",
      dosagePerAcre: "1 bag (50kg) at sowing",
      timing: "Apply fully at sowing time, mixed into the soil",
      approxPriceRangePKR: "11,000 - 13,500 per 50kg bag",
      urduNote: "بوائی کے وقت پوری مقدار میں ڈی اے پی ڈالیں تاکہ جڑیں مضبوط ہوں۔",
    },
    {
      name: "Urea",
      type: "Nitrogen",
      purpose: "Leaf growth and tillering",
      dosagePerAcre: "2 bags (100kg) total, split into 2 doses",
      timing: "Half at first irrigation, half at second irrigation",
      approxPriceRangePKR: "3,800 - 4,500 per 50kg bag",
      urduNote: "پہلی اور دوسری آبپاشی پر برابر مقدار میں یوریا ڈالیں۔",
    },
  ],
  rice: [
    {
      name: "Urea",
      type: "Nitrogen",
      purpose: "Tillering and grain filling",
      dosagePerAcre: "3 bags (150kg), split in 3 doses",
      timing: "At transplanting, tillering stage, and panicle initiation",
      approxPriceRangePKR: "3,800 - 4,500 per 50kg bag",
      urduNote: "تین مراحل میں یوریا دیں: پنیری لگاتے وقت، کلے نکلتے وقت، اور بالی بننے کے وقت۔",
    },
    {
      name: "DAP",
      type: "Phosphorus",
      purpose: "Root and early growth support",
      dosagePerAcre: "1 bag (50kg) before transplanting",
      timing: "Mixed into puddled field before transplanting",
      approxPriceRangePKR: "11,000 - 13,500 per 50kg bag",
      urduNote: "پنیری لگانے سے پہلے کھیت میں ڈی اے پی ملا دیں۔",
    },
  ],
  cotton: [
    {
      name: "NPK Compound (e.g. 20-20-13)",
      type: "Compound/NPK",
      purpose: "Balanced growth and boll development",
      dosagePerAcre: "2 bags (100kg) split across the season",
      timing: "At sowing and again at flowering/boll formation",
      approxPriceRangePKR: "9,000 - 12,000 per 50kg bag",
      urduNote: "بوائی اور ٹینڈے بننے کے وقت متوازن کھاد دیں۔",
    },
    {
      name: "SOP (Sulphate of Potash)",
      type: "Potassium",
      purpose: "Boosts boll size and fiber quality",
      dosagePerAcre: "1 bag (50kg) at boll formation",
      timing: "During boll formation stage",
      approxPriceRangePKR: "13,000 - 16,000 per 50kg bag",
      urduNote: "ٹینڈے بننے کے وقت پوٹاش کھاد ضرور دیں، اس سے روئی کا معیار بہتر ہوتا ہے۔",
    },
  ],
  sugarcane: [
    {
      name: "Urea",
      type: "Nitrogen",
      purpose: "Heavy nitrogen demand throughout growth",
      dosagePerAcre: "4-5 bags (200-250kg), split in 3-4 doses",
      timing: "At planting, then every 2 months through the growing season",
      approxPriceRangePKR: "3,800 - 4,500 per 50kg bag",
      urduNote: "گنے کو نائٹروجن کی زیادہ ضرورت ہوتی ہے، اسے 3-4 حصوں میں تقسیم کر کے دیں۔",
    },
    {
      name: "DAP",
      type: "Phosphorus",
      purpose: "Root establishment for setts",
      dosagePerAcre: "1.5 bags (75kg) at planting",
      timing: "At planting, in furrows",
      approxPriceRangePKR: "11,000 - 13,500 per 50kg bag",
      urduNote: "قلمیں لگاتے وقت نالیوں میں ڈی اے پی ڈالیں۔",
    },
  ],
  maize: [
    {
      name: "Urea",
      type: "Nitrogen",
      purpose: "Rapid vegetative growth",
      dosagePerAcre: "2.5 bags (125kg), split in 2-3 doses",
      timing: "At sowing, knee-high stage, and tasseling",
      approxPriceRangePKR: "3,800 - 4,500 per 50kg bag",
      urduNote: "بوائی، گھٹنے کی اونچائی، اور پھول آنے کے وقت یوریا دیں۔",
    },
    {
      name: "DAP",
      type: "Phosphorus",
      purpose: "Strong early root system",
      dosagePerAcre: "1 bag (50kg) at sowing",
      timing: "At sowing",
      approxPriceRangePKR: "11,000 - 13,500 per 50kg bag",
      urduNote: "بوائی کے وقت ڈی اے پی ڈالیں۔",
    },
  ],
  chickpea: [
    {
      name: "SSP (Single Super Phosphate)",
      type: "Phosphorus",
      purpose: "Light phosphorus boost — chickpea fixes its own nitrogen",
      dosagePerAcre: "1 bag (50kg) at sowing",
      timing: "At sowing only",
      approxPriceRangePKR: "3,500 - 4,500 per 50kg bag",
      urduNote: "چنا خود نائٹروجن بناتا ہے، صرف بوائی پر ہلکی فاسفورس کھاد کافی ہے۔",
    },
  ],
  mango: [
    {
      name: "Farmyard Manure (organic)",
      type: "Organic",
      purpose: "Long-term soil health for the orchard",
      dosagePerAcre: "2-3 trolleys per acre, annually",
      timing: "Once a year, after harvest",
      approxPriceRangePKR: "8,000 - 15,000 per trolley (varies by area)",
      urduNote: "ہر سال فصل کی کٹائی کے بعد گوبر کی کھاد ڈالیں۔",
    },
    {
      name: "NPK Compound (balanced)",
      type: "Compound/NPK",
      purpose: "Supports flowering and fruit set",
      dosagePerAcre: "1-2 bags per mature tree area, annually",
      timing: "Just before flowering (Jan-Feb)",
      approxPriceRangePKR: "9,000 - 12,000 per 50kg bag",
      urduNote: "پھول آنے سے پہلے (جنوری-فروری) متوازن کھاد دیں۔",
    },
  ],
  potato: [
    {
      name: "NPK Compound (high potash)",
      type: "Compound/NPK",
      purpose: "Tuber development and size",
      dosagePerAcre: "2 bags (100kg) at sowing and earthing-up",
      timing: "Half at sowing, half at earthing-up (ridging)",
      approxPriceRangePKR: "9,000 - 12,000 per 50kg bag",
      urduNote: "بوائی اور مینڈ بنانے کے وقت پوٹاش والی کھاد دیں تاکہ آلو کا سائز بہتر ہو۔",
    },
  ],
};

export function getFertilizerRecommendation(crop: string): FertilizerRecommendation[] {
  const key = crop.trim().toLowerCase();
  return FERTILIZER_GUIDE[key] ?? [];
}
