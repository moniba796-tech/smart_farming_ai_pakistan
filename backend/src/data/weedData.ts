/**
 * data/weedData.ts
 * -----------------
 * Curated knowledge base of major Pakistani weeds: identification, yield
 * loss impact, role in hosting insect pests/diseases, and control methods.
 * Kept as static data (not an image classifier) since a wrong auto-ID
 * could lead a farmer to use the wrong herbicide.
 */

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
  /** Urdu-language summary: identification + impact + recommended solution, for farmers who read Urdu. */
  urduSummary: string;
}

export const WEED_DATA: WeedEntry[] = [
  {
    key: "phalaris_minor",
    nameEn: "Little Seed Canary Grass",
    nameUrdu: "دمبی سٹی",
    nameRomanUrdu: "Dumbi Sitti",
    type: "Grassy weed",
    affectedCrops: ["Wheat"],
    identification:
      "Narrow grass-like leaves similar to wheat seedlings, but leaf blade twisted and rougher; forms dense clumps that out-compete wheat tillers.",
    yieldLoss: "15% - 50% wheat yield loss in heavily infested fields; can reach 60%+ if left uncontrolled for 2-3 seasons.",
    pestDiseaseHostRole:
      "Hosts wheat aphids and can carry over rust spores between wheat seasons, acting as a green bridge when wheat fields are empty.",
    criticalPeriod: "First 30-45 days after wheat sowing.",
    controlCultural: "Delay sowing 1-2 weeks after the first weed flush, use certified weed-free seed, rotate with berseem or gram.",
    controlMechanical: "Hand weeding/hoeing 25-35 days after sowing, before seed set.",
    controlChemical:
      "Clodinafop or fenoxaprop-p-ethyl at 30-35 days after sowing are commonly used — confirm product/dose with your local agriculture office; resistance has been reported in parts of Punjab.",
    prevention: "Clean farm machinery between fields; avoid untreated saved seed from infested fields.",
    urduSummary:
      "دمبی سٹی گندم جیسی پتلی گھاس ہے جو گندم کے پودوں کے ساتھ الجھ کر اگتی ہے۔ اس سے گندم کی پیداوار میں 15 سے 50 فیصد تک کمی آ سکتی ہے، اور یہ گندم کی چیپے اور زنگ کی بیماری کو اگلے سیزن تک زندہ رکھنے میں مدد دیتی ہے۔ حل: بوائی 1-2 ہفتے تاخیر سے کریں، بوائی کے 25-35 دن بعد ہاتھ سے گوڈی کریں، اور مقامی زرعی دفتر سے مناسب سپرے کی سفارش لیں۔",
  },
  {
    key: "avena_fatua",
    nameEn: "Wild Oat",
    nameUrdu: "جنگلی جئی",
    nameRomanUrdu: "Jangli Jai",
    type: "Grassy weed",
    affectedCrops: ["Wheat"],
    identification: "Taller than wheat, drooping seed heads, hairy leaf sheaths — visible once it heads out above the wheat canopy.",
    yieldLoss: "10% - 40% wheat yield loss depending on density.",
    pestDiseaseHostRole: "Can host cereal rust and some stem-boring insects, letting them survive after wheat harvest.",
    criticalPeriod: "First 40 days after sowing.",
    controlCultural: "Crop rotation with non-cereal crops; deep summer ploughing to expose buried seeds.",
    controlMechanical: "Hand-pulling before seed set — seeds shatter easily once mature.",
    controlChemical: "Fenoxaprop or pinoxaden group products are commonly used — confirm locally, resistance reported in some populations.",
    prevention: "Use clean, certified seed and clean equipment between fields.",
    urduSummary:
      "جنگلی جئی گندم سے اونچی ہوتی ہے اور اس کے بیج آسانی سے گر کر پھیل جاتے ہیں۔ یہ گندم کی پیداوار میں 10 سے 40 فیصد کمی کر سکتی ہے اور زنگ کی بیماری کو فصل کی کٹائی کے بعد بھی زندہ رکھتی ہے۔ حل: بیج بننے سے پہلے ہاتھ سے اکھاڑیں، فصل کی تبدیلی کریں، اور گرمیوں میں گہرا ہل چلائیں تاکہ زیر زمین بیج تلف ہو جائیں۔",
  },
  {
    key: "rumex_dentatus",
    nameEn: "Toothed Dock",
    nameUrdu: "جنگلی پالک",
    nameRomanUrdu: "Jangli Palak",
    type: "Broadleaf weed",
    affectedCrops: ["Wheat", "Chickpea"],
    identification: "Broad, spinach-like crinkled leaves in a low rosette, later sends up a tall seed stalk.",
    yieldLoss: "5% - 20% yield loss, mainly through nutrient/water competition.",
    pestDiseaseHostRole: "Can harbor leaf-feeding insects and fungal leaf spot pathogens that move onto the main crop.",
    criticalPeriod: "Early vegetative stage (first 6-8 weeks).",
    controlCultural: "Good field sanitation, timely irrigation favoring crop growth.",
    controlMechanical: "Hand weeding — easy to uproot before flowering.",
    controlChemical: "Broadleaf-selective herbicides labeled for wheat/legumes; confirm crop compatibility first.",
    prevention: "Avoid moving soil/manure from infested fields — seeds survive in soil for years.",
    urduSummary:
      "جنگلی پالک چوڑے پتوں والی جڑی بوٹی ہے جو گندم اور چنے کی فصل میں پانی اور خوراک کا مقابلہ کرتی ہے، جس سے 5 سے 20 فیصد نقصان ہو سکتا ہے۔ یہ کیڑوں اور پتوں کی بیماریوں کو بھی پناہ دیتی ہے۔ حل: پھول آنے سے پہلے ہاتھ سے اکھاڑ دیں، اور متاثرہ کھیت کی مٹی یا کھاد دوسرے کھیتوں میں نہ لے جائیں۔",
  },
  {
    key: "chenopodium_album",
    nameEn: "Lambsquarters / Fat Hen",
    nameUrdu: "باتھو",
    nameRomanUrdu: "Bathu",
    type: "Broadleaf weed",
    affectedCrops: ["Wheat", "Sugarcane", "Vegetables"],
    identification: "Diamond-shaped leaves with whitish-grey mealy coating underneath; grows fast and tall if uncontrolled.",
    yieldLoss: "10% - 30% depending on crop/density; very competitive for nitrogen.",
    pestDiseaseHostRole: "Known host for leaf miners, aphids, and several viruses that spread to nearby vegetable/cereal crops.",
    criticalPeriod: "First 4-6 weeks of crop growth.",
    controlCultural: "Stale seedbed technique — irrigate before sowing to trigger germination, remove before planting.",
    controlMechanical: "Hoeing/inter-row cultivation while young, before 15-20cm height.",
    controlChemical: "Broadleaf herbicides registered for the specific crop; check label restrictions near flowering vegetables.",
    prevention: "Clean field bunds and irrigation channels — seeds spread easily with water.",
    urduSummary:
      "باتھو تیزی سے بڑھنے والی جڑی بوٹی ہے جو گندم، گنا اور سبزیوں میں نائٹروجن کھاد کا بڑا حصہ چھین لیتی ہے، جس سے 10 سے 30 فیصد نقصان ہو سکتا ہے۔ یہ چیپے اور پتوں کی سرنگ بنانے والے کیڑوں کو بھی پناہ دیتی ہے۔ حل: بوائی سے پہلے کھیت کو پانی دے کر جڑی بوٹیاں اگائیں اور صاف کریں، اور چھوٹی حالت میں ہی گوڈی کر دیں۔",
  },
  {
    key: "cyperus_rotundus",
    nameEn: "Purple Nutsedge",
    nameUrdu: "دیلا / موتھا",
    nameRomanUrdu: "Deela / Motha",
    type: "Sedge (grass-like, not a true grass)",
    affectedCrops: ["Sugarcane", "Cotton", "Maize", "Vegetables"],
    identification: "Glossy, triangular-stemmed leaves in groups of three; spreads via underground tubers — one of the hardest weeds to remove.",
    yieldLoss: "20% - 50%+ in heavily infested sugarcane/vegetable fields.",
    pestDiseaseHostRole: "Tubers/rhizomes shelter soil-borne fungi and nematodes between cropping seasons.",
    criticalPeriod: "Throughout the crop cycle — re-sprouts from tubers even after top removal.",
    controlCultural: "Deep ploughing in hot dry weather to expose tubers; avoid excess irrigation.",
    controlMechanical: "Repeated hoeing every 2-3 weeks to exhaust tuber reserves — a single removal is never enough.",
    controlChemical: "Halosulfuron-based systemic sedge herbicides are typically needed; consult your local agriculture office.",
    prevention: "Never move tillage equipment from an infested field to a clean one without cleaning it.",
    urduSummary:
      "دیلا (موٹھا) سب سے نقصان دہ جڑی بوٹیوں میں سے ایک ہے جو زیر زمین جڑوں سے پھیلتی ہے۔ گنے اور سبزیوں میں 20 سے 50 فیصد تک نقصان کر سکتی ہے اور مٹی کی بیماریوں کو اگلے سیزن تک محفوظ رکھتی ہے۔ حل: گرمی میں گہرا ہل چلائیں، ہر 2-3 ہفتے بعد گوڈی دہرائیں، اور ایک کھیت سے دوسرے کھیت میں آلات لے جانے سے پہلے صاف کریں۔",
  },
  {
    key: "trianthema_portulacastrum",
    nameEn: "Horse Purslane",
    nameUrdu: "اٹسٹ",
    nameRomanUrdu: "Itsit",
    type: "Broadleaf weed",
    affectedCrops: ["Cotton", "Maize", "Sugarcane"],
    identification: "Low, spreading, fleshy reddish-green stems with small oval leaves; thrives in hot, humid Kharif conditions.",
    yieldLoss: "15% - 40% in cotton/maize if uncontrolled during early growth.",
    pestDiseaseHostRole: "Can host whitefly, a major vector of cotton leaf curl virus.",
    criticalPeriod: "First 30-45 days after sowing (Kharif).",
    controlCultural: "Early sowing so the canopy closes before peak weed germination; balanced fertilizer for crop vigor.",
    controlMechanical: "Inter-row cultivation/hoeing during early growth.",
    controlChemical: "Pre-emergence or early post-emergence herbicides labeled for cotton/maize; check with local agriculture office.",
    prevention: "Manage field margins and irrigation channels — spreads fast with water movement.",
    urduSummary:
      "اٹسٹ کپاس اور مکئی میں تیزی سے پھیلتی ہے اور سفید مکھی کو پناہ دیتی ہے جو کپاس کی پتا مروڑ بیماری پھیلاتی ہے۔ 15 سے 40 فیصد نقصان ہو سکتا ہے۔ حل: جلد بوائی کریں تاکہ فصل جلدی سایہ کرے، ابتدائی مرحلے میں گوڈی کریں، اور آبپاشی کی نالیوں کو صاف رکھیں۔",
  },
  {
    key: "cynodon_dactylon",
    nameEn: "Bermuda Grass",
    nameUrdu: "خبل",
    nameRomanUrdu: "Khabbal",
    type: "Grassy weed",
    affectedCrops: ["Cotton", "Sugarcane", "Orchards"],
    identification: "Low, wiry grass spreading via surface runners and underground rhizomes — very hard to eliminate once established.",
    yieldLoss: "10% - 30% in orchards/row crops through root competition.",
    pestDiseaseHostRole: "Alternate host for stem borers and root-feeding insects attacking sugarcane and cotton.",
    criticalPeriod: "Ongoing — perennial weed, control must repeat across seasons.",
    controlCultural: "Deep summer ploughing to expose rhizomes; avoid moving contaminated soil between fields.",
    controlMechanical: "Repeated digging out of rhizomes — regrows from any remaining fragment.",
    controlChemical: "Glyphosate pre-planting/in orchard inter-rows, kept away from the crop — never spray directly on standing cotton/sugarcane.",
    prevention: "Clean equipment between fields; mow field bunds before it sets seed.",
    urduSummary:
      "خبل ایک بارہماسی گھاس ہے جو زمین کے اوپر اور نیچے دونوں طرح سے پھیلتی ہے، اسے مکمل ختم کرنا مشکل ہے۔ باغات اور کپاس میں پانی و خوراک کا مقابلہ کرتی ہے، 10 سے 30 فیصد نقصان ممکن ہے، اور تنے کھانے والے کیڑوں کو پناہ دیتی ہے۔ حل: گرمی میں گہرا ہل چلائیں، بار بار جڑیں نکالیں، اور آلات کو ہر کھیت کے بعد صاف کریں۔",
  },
  {
    key: "echinochloa_colona",
    nameEn: "Jungle Rice",
    nameUrdu: "سوانک",
    nameRomanUrdu: "Swank",
    type: "Grassy weed",
    affectedCrops: ["Rice", "Maize"],
    identification: "Looks very similar to young rice seedlings — smooth leaf sheaths without hairs distinguish it from rice.",
    yieldLoss: "15% - 40% rice yield loss in flooded/direct-seeded rice.",
    pestDiseaseHostRole: "Hosts rice stem borer and some rice viruses, persisting in field bunds between rice crops.",
    criticalPeriod: "First 20-40 days after transplanting/sowing.",
    controlCultural: "Proper land leveling and standing water depth, which suppresses germination in rice.",
    controlMechanical: "Hand weeding at 20-25 days after transplanting.",
    controlChemical: "Butachlor or pretilachlor pre-emergence products are commonly used — confirm dose/timing locally.",
    prevention: "Use certified weed-free rice seed and clean nursery beds.",
    urduSummary:
      "سوانک دیکھنے میں چاول کے پودوں جیسی لگتی ہے، اسی لیے شناخت مشکل ہوتی ہے۔ چاول کی پیداوار میں 15 سے 40 فیصد کمی کر سکتی ہے اور تنے کے سوراخ کرنے والے کیڑے کو پناہ دیتی ہے۔ حل: کھیت کو اچھی طرح ہموار کریں، پانی کی مناسب سطح برقرار رکھیں، اور پنیری لگانے کے 20-25 دن بعد ہاتھ سے گوڈی کریں۔",
  },
  {
    key: "convolvulus_arvensis",
    nameEn: "Field Bindweed",
    nameUrdu: "لہلی / ہرن کھری",
    nameRomanUrdu: "Lehli / Hirankhuri",
    type: "Vine / creeping broadleaf weed",
    affectedCrops: ["Wheat", "Cotton", "Orchards"],
    identification: "Twining vine, arrow-shaped leaves, small pink-white trumpet flowers; climbs and smothers crop plants.",
    yieldLoss: "10% - 25%, plus can tangle in harvesting machinery.",
    pestDiseaseHostRole: "Can host root-knot nematodes and leaf-feeding insects persisting between seasons.",
    criticalPeriod: "Whole growing season — persistent perennial with a deep root system.",
    controlCultural: "Avoid leaving field margins unmanaged — spreads rapidly from there.",
    controlMechanical: "Repeated cutting/hoeing weakens it over time; full removal is difficult due to deep roots.",
    controlChemical: "Broadleaf-selective or systemic herbicides depending on crop/history — confirm locally.",
    prevention: "Regular field-margin maintenance; avoid soil movement from infested areas.",
    urduSummary:
      "لہلی ایک بیل کی طرح کی جڑی بوٹی ہے جو فصل کے پودوں سے لپٹ کر انہیں دبا دیتی ہے اور فصل کاٹنے میں بھی مشکل پیدا کرتی ہے۔ 10 سے 25 فیصد نقصان کے علاوہ یہ نیماٹوڈز کو بھی پناہ دیتی ہے۔ حل: بار بار کاٹتے رہیں تاکہ کمزور ہو جائے، اور کھیت کی حدود کو صاف رکھیں کیونکہ یہ وہیں سے پھیلنا شروع ہوتی ہے۔",
  },
  {
    key: "parthenium_hysterophorus",
    nameEn: "Congress Grass / Carrot Weed",
    nameUrdu: "گاجر بوٹی",
    nameRomanUrdu: "Gajar Booti",
    type: "Broadleaf weed (invasive)",
    affectedCrops: ["Field margins", "Fallow land", "Orchards", "Roadsides near farms"],
    identification:
      "Fern-like, deeply cut leaves with small white flower clusters. Caution: can cause skin allergies and respiratory irritation — handle with gloves.",
    yieldLoss: "Reduces effective cropped area; can indirectly cause 20%+ losses in adjoining crops through allelopathy.",
    pestDiseaseHostRole: "Not a major direct pest host, but dense growth shelters rodents and provides pest cover near field edges.",
    criticalPeriod: "Grows year-round in warm weather — control before flowering.",
    controlCultural: "Mow/slash before flowering; avoid overgrazing nearby land.",
    controlMechanical: "Hand removal with gloves and long sleeves due to allergenic sap.",
    controlChemical: "Non-selective herbicides on field margins/fallow areas, kept away from standing crops.",
    prevention: "Clear from field boundaries, irrigation channels, and farm buildings before flowering.",
    urduSummary:
      "گاجر بوٹی تیزی سے پھیلنے والی جڑی بوٹی ہے جو انسانوں اور مویشیوں میں الرجی پیدا کر سکتی ہے — اسے ہٹاتے وقت دستانے ضرور پہنیں۔ یہ ارد گرد کی فصلوں کی نشوونما کو بھی متاثر کرتی ہے۔ حل: پھول آنے سے پہلے کاٹ دیں یا اکھاڑ دیں، اور کھیت کی حدود، نالیوں اور عمارتوں کے ارد گرد باقاعدگی سے صفائی رکھیں۔",
  },
];

export const CROP_WEED_MAP: Record<string, string[]> = {
  wheat: ["phalaris_minor", "avena_fatua", "rumex_dentatus", "chenopodium_album", "convolvulus_arvensis"],
  rice: ["echinochloa_colona", "cyperus_rotundus"],
  cotton: ["trianthema_portulacastrum", "cynodon_dactylon", "convolvulus_arvensis", "cyperus_rotundus"],
  sugarcane: ["cynodon_dactylon", "cyperus_rotundus", "trianthema_portulacastrum", "chenopodium_album"],
  maize: ["trianthema_portulacastrum", "echinochloa_colona", "cyperus_rotundus"],
  chickpea: ["rumex_dentatus"],
  mango: ["cynodon_dactylon", "parthenium_hysterophorus"],
  potato: ["chenopodium_album", "cyperus_rotundus"],
};

export function getWeedsForCrop(cropName?: string): WeedEntry[] {
  if (!cropName) return WEED_DATA;
  const keys = CROP_WEED_MAP[cropName.trim().toLowerCase()];
  if (!keys) return WEED_DATA;
  return WEED_DATA.filter((w) => keys.includes(w.key));
}

export function getWeedByKey(key: string): WeedEntry | undefined {
  return WEED_DATA.find((w) => w.key === key);
}
