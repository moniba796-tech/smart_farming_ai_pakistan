import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import { useLanguage } from "@/context/LanguageContext";

interface Step {
  emoji: string;
  en: string;
  ur: string;
}

const STEPS: Step[] = [
  {
    emoji: "🌱",
    en: "Disease Detection: Tap the leaf icon, take or upload a clear photo of the affected leaf/fruit, then tap 'Analyze Image'.",
    ur: "بیماری کی تشخیص: پتے کے آئیکن پر کلک کریں، متاثرہ پتے یا پھل کی صاف تصویر لیں یا اپلوڈ کریں، پھر 'تصویر کا تجزیہ کریں' پر کلک کریں۔",
  },
  {
    emoji: "🌾",
    en: "Crop Advisor: Tap 'Use My GPS Location' to auto-fill your area's weather, or type your city name. Adjust the soil sliders if you know your soil test results, then tap 'Get Crop Recommendation'.",
    ur: "فصل کا مشورہ: 'GPS لوکیشن استعمال کریں' پر کلک کریں تاکہ موسم خودکار آ جائے، یا اپنے شہر کا نام لکھیں۔ اگر مٹی کی جانچ کا نتیجہ معلوم ہو تو سلائیڈرز ایڈجسٹ کریں، پھر 'فصل کی سفارش حاصل کریں' پر کلک کریں۔",
  },
  {
    emoji: "🌿",
    en: "Weed Management: Select your crop from the filter, then tap on any weed name from the list to see how to identify it and how to control it.",
    ur: "جڑی بوٹیوں کا انتظام: فلٹر سے اپنی فصل منتخب کریں، پھر فہرست سے کسی بھی جڑی بوٹی کے نام پر کلک کریں تاکہ اس کی پہچان اور کنٹرول کا طریقہ معلوم ہو۔",
  },
  {
    emoji: "🛒",
    en: "Marketplace: Choose your crop to see the right fertilizer, then use GPS to find verified shops near you where you can buy it.",
    ur: "مارکیٹ پلیس: اپنی فصل منتخب کریں تاکہ صحیح کھاد معلوم ہو، پھر GPS کے ذریعے اپنے قریب تصدیق شدہ دکانیں تلاش کریں۔",
  },
  {
    emoji: "🤖",
    en: "AI Assistant: Type any farming question, or tap the microphone icon and just speak — in English, Urdu, or Roman Urdu.",
    ur: "AI معاون: کاشتکاری سے متعلق کوئی بھی سوال لکھیں، یا مائیکروفون آئیکن پر کلک کر کے بس بولیں — انگریزی، اردو، یا رومن اردو میں۔",
  },
  {
    emoji: "🗣️",
    en: "Change Language: Tap the language button (top right) anytime to switch the whole app between English and Urdu.",
    ur: "زبان تبدیل کریں: کسی بھی وقت اوپر دائیں طرف زبان کا بٹن دبا کر پوری ایپ کو انگریزی اور اردو کے درمیان تبدیل کریں۔",
  },
];

export default function HowToUse() {
  const { isRTL } = useLanguage();
  const youtubeId = import.meta.env.VITE_TUTORIAL_YOUTUBE_ID;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <span className="text-4xl">📺</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>
          {isRTL ? "ایپ کیسے استعمال کریں" : "How to Use This App"}
        </h1>
        <p className={`text-gray-500 mt-1 max-w-xl mx-auto ${isRTL ? "urdu-text" : ""}`}>
          {isRTL
            ? "ہر فیچر کو بہترین طریقے سے استعمال کرنے کا مکمل رہنما، اردو اور انگریزی دونوں میں۔"
            : "A complete guide to getting the most out of every feature, in both Urdu and English."}
        </p>
      </motion.div>

      <div className="mb-10">
        <VideoPlayer
          youtubeId={youtubeId}
          titleEn="How to Use Smart Farming AI Pakistan"
          titleUr="سمارٹ فارمنگ AI پاکستان کیسے استعمال کریں"
        />
      </div>

      <div className="space-y-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-farm-100 shadow-card p-5 flex gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-farm-50 flex items-center justify-center text-2xl flex-shrink-0">
              {step.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-farm-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">{step.en}</p>
              <p className="urdu-text text-sm text-farm-700 leading-loose">{step.ur}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
