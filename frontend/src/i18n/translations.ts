/**
 * i18n/translations.ts
 * ----------------------
 * Static UI text (navigation, footer, page headers, buttons) in English
 * and Urdu. This is separate from the farming knowledge base content
 * (crop/weed Urdu summaries live alongside their English data in
 * backend/src/data/*.ts) — this file only covers interface chrome.
 */

export type UILanguage = "en" | "ur";

export interface TranslationShape {
  appName: string;
  nav: {
    home: string;
    disease: string;
    crop: string;
    weeds: string;
    assistant: string;
    marketplace: string;
  };
  home: {
    heroTagline: string;
    heroTitle: string;
    heroSubtitle: string;
    scanPlant: string;
    getCropAdvice: string;
    featuresHeading: string;
    diseaseTitle: string;
    diseaseDesc: string;
    cropTitle: string;
    cropDesc: string;
    weedTitle: string;
    weedDesc: string;
    assistantTitle: string;
    assistantDesc: string;
    marketplaceTitle: string;
    marketplaceDesc: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    language: string;
    disclaimer: string;
    madeFor: string;
  };
  pages: {
    diseaseTitle: string;
    diseaseSubtitle: string;
    cropTitle: string;
    cropSubtitle: string;
    weedTitle: string;
    weedSubtitle: string;
    assistantTitle: string;
    assistantSubtitle: string;
    marketplaceTitle: string;
    marketplaceSubtitle: string;
    retailerSignupTitle: string;
    retailerSignupSubtitle: string;
  };
}

export const translations: Record<UILanguage, TranslationShape> = {
  en: {
    appName: "Smart Farming AI Pakistan",
    nav: {
      home: "Home",
      disease: "Disease Detection",
      crop: "Crop Advisor",
      weeds: "Weed Management",
      assistant: "AI Assistant",
      marketplace: "Marketplace",
    },
    home: {
      heroTagline: "Made for Pakistani Farmers",
      heroTitle: "Smart Farming AI",
      heroSubtitle:
        "Detect plant diseases, get crop recommendations, manage weeds, and chat with an AI farming assistant — in English, Urdu, or Roman Urdu. Free tools, built for the field.",
      scanPlant: "Scan a Plant",
      getCropAdvice: "Get Crop Advice",
      featuresHeading: "Everything You Need, In One Place",
      diseaseTitle: "Disease Detection",
      diseaseDesc: "Upload a photo of a leaf, fruit, or vegetable and get symptoms, causes, and treatment options instantly.",
      cropTitle: "Crop Advisor",
      cropDesc: "Enter your soil and climate data — or use GPS + live weather — to get the best crop recommendation.",
      weedTitle: "Weed Management",
      weedDesc: "Identify common weeds, understand their yield-loss impact and pest-hosting role, and get control methods.",
      assistantTitle: "AI Assistant",
      assistantDesc: "Ask any farming question in English, Urdu, or Roman Urdu — type or just speak with your voice.",
      marketplaceTitle: "Marketplace",
      marketplaceDesc: "Get the right fertilizer for your crop and find verified retailers near you to buy from.",
    },
    footer: {
      about:
        "Smart Farming AI Pakistan helps farmers across the country detect plant diseases, choose the right crop for their soil and weather, identify and manage weeds, and get instant answers to everyday farming questions — free, and in the language you're comfortable with.",
      quickLinks: "Quick Links",
      language: "Language",
      disclaimer:
        "This tool provides general, AI-generated farming guidance and is not a replacement for advice from a licensed agronomist or your local agriculture extension office.",
      madeFor: "Developed for Pakistani farmers",
    },
    pages: {
      diseaseTitle: "Plant Disease Detection",
      diseaseSubtitle:
        "Upload a photo of a leaf, fruit, or vegetable. Our AI checks for common diseases and gives you symptoms, causes, and both organic and chemical treatment options.",
      cropTitle: "Smart Crop Advisor",
      cropSubtitle:
        "Get weather auto-filled by city or GPS, adjust your soil nutrients, and get a crop recommendation with expected yield, water needs, fertilizer, and sowing guidance.",
      weedTitle: "Weed Identification & Management",
      weedSubtitle:
        "Weeds don't just steal water, sunlight, and nutrients from your crop — many also act as a hiding place for insect pests and plant diseases between seasons.",
      assistantTitle: "AI Farmer Assistant",
      assistantSubtitle:
        "Ask anything about crops, pests, fertilizers, irrigation, weather, seeds, harvest, organic farming, or government schemes.",
      marketplaceTitle: "Fertilizer Marketplace",
      marketplaceSubtitle:
        "Get the right fertilizer recommendation for your crop, and find verified retailers near you to buy from.",
      retailerSignupTitle: "Register Your Shop",
      retailerSignupSubtitle:
        "Sell fertilizer, pesticides, seeds, or equipment? Join our marketplace so nearby farmers can find and contact you.",
    },
  },
  ur: {
    appName: "سمارٹ فارمنگ AI پاکستان",
    nav: {
      home: "ہوم",
      disease: "بیماری کی تشخیص",
      crop: "فصل کا مشورہ",
      weeds: "جڑی بوٹیوں کا انتظام",
      assistant: "AI معاون",
      marketplace: "مارکیٹ پلیس",
    },
    home: {
      heroTagline: "پاکستانی کسانوں کے لیے بنایا گیا",
      heroTitle: "سمارٹ فارمنگ AI",
      heroSubtitle:
        "پودوں کی بیماریوں کی تشخیص کریں، فصل کی سفارش حاصل کریں، جڑی بوٹیوں کا انتظام کریں، اور AI معاون سے بات کریں — انگریزی، اردو، یا رومن اردو میں۔ مفت ٹولز، کھیت کے لیے بنائے گئے۔",
      scanPlant: "پودے کی جانچ کریں",
      getCropAdvice: "فصل کا مشورہ لیں",
      featuresHeading: "ہر ضرورت، ایک ہی جگہ",
      diseaseTitle: "بیماری کی تشخیص",
      diseaseDesc: "پتے، پھل، یا سبزی کی تصویر اپلوڈ کریں اور فوری طور پر علامات، وجوہات، اور علاج کے طریقے حاصل کریں۔",
      cropTitle: "فصل کا مشورہ",
      cropDesc: "اپنی زمین اور موسم کی معلومات درج کریں — یا GPS اور موسم کی معلومات استعمال کریں — بہترین فصل کی سفارش کے لیے۔",
      weedTitle: "جڑی بوٹیوں کا انتظام",
      weedDesc: "عام جڑی بوٹیوں کی پہچان کریں، ان کے نقصان اور کیڑوں کو پناہ دینے کے کردار کو سمجھیں، اور کنٹرول کے طریقے حاصل کریں۔",
      assistantTitle: "AI معاون",
      assistantDesc: "کاشتکاری سے متعلق کوئی بھی سوال انگریزی، اردو، یا رومن اردو میں پوچھیں — لکھیں یا اپنی آواز میں بولیں۔",
      marketplaceTitle: "مارکیٹ پلیس",
      marketplaceDesc: "اپنی فصل کے لیے صحیح کھاد حاصل کریں اور اپنے قریب تصدیق شدہ دکانداروں کو تلاش کریں۔",
    },
    footer: {
      about:
        "سمارٹ فارمنگ AI پاکستان ملک بھر کے کسانوں کو پودوں کی بیماریوں کی تشخیص کرنے، اپنی زمین اور موسم کے مطابق صحیح فصل چننے، جڑی بوٹیوں کی پہچان اور انتظام کرنے، اور روزمرہ کاشتکاری کے سوالات کے فوری جوابات حاصل کرنے میں مدد دیتا ہے — بالکل مفت، اور آپ کی اپنی زبان میں۔",
      quickLinks: "فوری روابط",
      language: "زبان",
      disclaimer:
        "یہ ٹول عمومی، AI کی تیار کردہ کاشتکاری رہنمائی فراہم کرتا ہے اور یہ کسی مستند زرعی ماہر یا آپ کے مقامی زرعی توسیعی دفتر کے مشورے کا متبادل نہیں ہے۔",
      madeFor: "پاکستانی کسانوں کے لیے تیار کیا گیا",
    },
    pages: {
      diseaseTitle: "پودوں کی بیماری کی تشخیص",
      diseaseSubtitle:
        "پتے، پھل، یا سبزی کی تصویر اپلوڈ کریں۔ ہماری AI عام بیماریوں کی جانچ کرتی ہے اور آپ کو علامات، وجوہات، اور نامیاتی و کیمیائی علاج کے اختیارات فراہم کرتی ہے۔",
      cropTitle: "سمارٹ فصل مشیر",
      cropSubtitle:
        "شہر یا GPS کے ذریعے موسم خودکار طور پر حاصل کریں، اپنی زمین کے غذائی اجزاء ایڈجسٹ کریں، اور متوقع پیداوار، پانی کی ضرورت، کھاد، اور بوائی کی رہنمائی کے ساتھ فصل کی سفارش حاصل کریں۔",
      weedTitle: "جڑی بوٹیوں کی پہچان اور انتظام",
      weedSubtitle:
        "جڑی بوٹیاں صرف آپ کی فصل سے پانی، دھوپ، اور غذائی اجزاء ہی نہیں چراتیں — بہت سی موسموں کے درمیان کیڑوں اور بیماریوں کی چھپنے کی جگہ بھی بنتی ہیں۔",
      assistantTitle: "AI کسان معاون",
      assistantSubtitle:
        "فصلوں، کیڑوں، کھادوں، آبپاشی، موسم، بیجوں، فصل کی کٹائی، نامیاتی کاشتکاری، یا سرکاری اسکیموں کے بارے میں کچھ بھی پوچھیں۔",
      marketplaceTitle: "کھاد مارکیٹ پلیس",
      marketplaceSubtitle:
        "اپنی فصل کے لیے صحیح کھاد کی سفارش حاصل کریں، اور اپنے قریب تصدیق شدہ دکانداروں کو تلاش کریں۔",
      retailerSignupTitle: "اپنی دکان رجسٹر کریں",
      retailerSignupSubtitle:
        "کھاد، کیڑے مار ادویات، بیج، یا آلات بیچتے ہیں؟ ہماری مارکیٹ پلیس میں شامل ہوں تاکہ قریبی کسان آپ کو تلاش اور رابطہ کر سکیں۔",
    },
  },
};
