/**
 * data/cropPriceData.ts
 * -----------------------
 * Indicative crop/commodity market rates by province, shown to farmers so
 * they have a general sense of price before selling or buying.
 *
 * IMPORTANT: Pakistan doesn't have a single free, reliable, real-time
 * government mandi-rate API. These are indicative price RANGES based on
 * typical seasonal market conditions — not live, minute-by-minute prices.
 * The UI must show a clear "indicative, not live" disclaimer (see
 * CropPrices.tsx). For production use, replace this with a scraped or
 * paid live source (e.g. a provincial Agriculture Marketing Information
 * Service feed) once available — the shape (province -> crop list) is
 * designed to make that swap easy without touching the frontend.
 */

export interface CropPriceEntry {
  crop: string;
  unit: string; // e.g. "per 40kg (maund)"
  priceRangePKR: string;
  note: string;
  urduNote: string;
}

export const CROP_PRICES_BY_PROVINCE: Record<string, CropPriceEntry[]> = {
  punjab: [
    {
      crop: "Wheat",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,200 - 3,800",
      note: "Prices typically peak just after harvest (April-May) then stabilize.",
      urduNote: "قیمتیں عام طور پر کٹائی کے فوراً بعد (اپریل-مئی) زیادہ ہوتی ہیں۔",
    },
    {
      crop: "Rice (Basmati)",
      unit: "per 40kg (maund)",
      priceRangePKR: "6,500 - 9,000",
      note: "Export-quality Basmati commands higher prices than IRRI varieties.",
      urduNote: "برآمدی معیار کا باسمتی چاول IRRI اقسام سے زیادہ قیمت پاتا ہے۔",
    },
    {
      crop: "Cotton",
      unit: "per 40kg (maund)",
      priceRangePKR: "7,500 - 9,500",
      note: "Prices fluctuate with international textile demand and quality grade.",
      urduNote: "قیمتیں بین الاقوامی ٹیکسٹائل طلب اور معیار کے مطابق بدلتی ہیں۔",
    },
    {
      crop: "Sugarcane",
      unit: "per 40kg (maund)",
      priceRangePKR: "400 - 500",
      note: "Government-notified support price often applies to sugarcane.",
      urduNote: "گنے پر اکثر حکومت کی مقرر کردہ امدادی قیمت لاگو ہوتی ہے۔",
    },
    {
      crop: "Maize",
      unit: "per 40kg (maund)",
      priceRangePKR: "2,400 - 3,000",
      note: "Demand from poultry feed industry keeps prices relatively stable.",
      urduNote: "پولٹری فیڈ انڈسٹری کی طلب قیمتوں کو نسبتاً مستحکم رکھتی ہے۔",
    },
  ],
  sindh: [
    {
      crop: "Rice (IRRI)",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,800 - 5,200",
      note: "Sindh is a major IRRI rice-growing belt with strong local demand.",
      urduNote: "سندھ IRRI چاول کی بڑی پیداواری پٹی ہے جہاں مقامی طلب زیادہ ہے۔",
    },
    {
      crop: "Cotton",
      unit: "per 40kg (maund)",
      priceRangePKR: "7,500 - 9,500",
      note: "Similar pricing to Punjab, tracks national ginning-industry rates.",
      urduNote: "پنجاب جیسی قیمتیں، قومی جننگ انڈسٹری کی شرح کے مطابق۔",
    },
    {
      crop: "Sugarcane",
      unit: "per 40kg (maund)",
      priceRangePKR: "380 - 480",
      note: "Mill proximity affects the price a farmer can negotiate.",
      urduNote: "چینی مل کا قریب ہونا کسان کی قیمت پر اثر ڈالتا ہے۔",
    },
    {
      crop: "Wheat",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,100 - 3,700",
      note: "Slightly below Punjab rates due to different procurement policy.",
      urduNote: "مختلف خریداری پالیسی کی وجہ سے پنجاب سے تھوڑی کم قیمت۔",
    },
    {
      crop: "Mango",
      unit: "per 40kg (maund)",
      priceRangePKR: "2,000 - 6,000",
      note: "Highly variety-dependent — Sindhri and Chaunsa command premium prices.",
      urduNote: "قسم پر انحصار کرتا ہے — سندھڑی اور چونسا زیادہ قیمت پاتے ہیں۔",
    },
  ],
  khyber_pakhtunkhwa: [
    {
      crop: "Wheat",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,200 - 3,900",
      note: "Local demand often exceeds provincial production, supporting prices.",
      urduNote: "مقامی طلب اکثر صوبائی پیداوار سے زیادہ ہوتی ہے جو قیمتوں کو سہارا دیتی ہے۔",
    },
    {
      crop: "Maize",
      unit: "per 40kg (maund)",
      priceRangePKR: "2,500 - 3,100",
      note: "A major KP crop, especially in Swat and Mardan.",
      urduNote: "سوات اور مردان میں خاص طور پر ایک اہم فصل۔",
    },
    {
      crop: "Sugarcane",
      unit: "per 40kg (maund)",
      priceRangePKR: "380 - 470",
      note: "Grown mainly in Mardan and Charsadda districts.",
      urduNote: "بنیادی طور پر مردان اور چارسدہ اضلاع میں کاشت ہوتا ہے۔",
    },
    {
      crop: "Tobacco",
      unit: "per 40kg (maund)",
      priceRangePKR: "8,000 - 14,000",
      note: "A significant cash crop in Swabi and Mardan; price depends on grade.",
      urduNote: "سوابی اور مردان میں اہم نقد آور فصل؛ قیمت گریڈ پر منحصر ہے۔",
    },
  ],
  balochistan: [
    {
      crop: "Wheat",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,300 - 4,000",
      note: "Often slightly higher due to lower local production volumes.",
      urduNote: "کم مقامی پیداوار کی وجہ سے اکثر تھوڑی زیادہ قیمت۔",
    },
    {
      crop: "Grapes",
      unit: "per 40kg (maund)",
      priceRangePKR: "4,000 - 9,000",
      note: "Quetta and Pishin grapes are prized — quality strongly affects price.",
      urduNote: "کوئٹہ اور پشین کے انگور مشہور ہیں — معیار قیمت پر گہرا اثر ڈالتا ہے۔",
    },
    {
      crop: "Apples",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,500 - 8,000",
      note: "Balochistan's cooler highlands (Kalat, Ziarat) grow premium apples.",
      urduNote: "بلوچستان کے ٹھنڈے پہاڑی علاقے (کوئٹہ، زیارت) اعلیٰ معیار کے سیب اگاتے ہیں۔",
    },
    {
      crop: "Dates",
      unit: "per 40kg (maund)",
      priceRangePKR: "3,000 - 7,000",
      note: "Turbat and Panjgur are major date-growing areas.",
      urduNote: "تربت اور پنجگور کھجور کی کاشت کے بڑے علاقے ہیں۔",
    },
  ],
};

export function getCropPricesByProvince(province: string): CropPriceEntry[] {
  const key = province.trim().toLowerCase().replace(/\s+/g, "_");
  return CROP_PRICES_BY_PROVINCE[key] ?? [];
}

export function getAvailableProvinces(): string[] {
  return Object.keys(CROP_PRICES_BY_PROVINCE);
}
