import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getCropPrices } from "@/api/client";
import { useLanguage } from "@/context/LanguageContext";
import type { CropPriceEntry, ApiError } from "@/types";

const PROVINCES = [
  { value: "punjab", en: "Punjab", ur: "پنجاب" },
  { value: "sindh", en: "Sindh", ur: "سندھ" },
  { value: "khyber_pakhtunkhwa", en: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا" },
  { value: "balochistan", en: "Balochistan", ur: "بلوچستان" },
];

export default function CropPrices() {
  const { isRTL } = useLanguage();
  const [province, setProvince] = useState("punjab");
  const [prices, setPrices] = useState<CropPriceEntry[] | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearched(true);
    const res = await getCropPrices(province);
    if (res.success) {
      const r = res as { prices: CropPriceEntry[]; note?: string };
      setPrices(r.prices);
      setNote(r.note ?? null);
    } else {
      setError((res as ApiError).error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-4xl">💰</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>
          {isRTL ? "فصلوں کی مارکیٹ قیمتیں" : "Crop Market Prices"}
        </h1>
        <p className={`text-gray-500 mt-1 max-w-xl ${isRTL ? "urdu-text" : ""}`}>
          {isRTL
            ? "اپنا صوبہ منتخب کریں اور اپنی فصل کی موجودہ اندازاً منڈی قیمت معلوم کریں۔"
            : "Select your province to see indicative market rates for major crops before you buy or sell."}
        </p>
      </motion.div>

      {/* Disclaimer banner */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-sm text-amber-700">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p>
            These are <b>indicative price ranges</b>, not live minute-by-minute mandi rates. Actual prices vary
            by district, quality grade, and daily market conditions — always confirm with your local mandi
            before finalizing a sale.
          </p>
          <p className="urdu-text mt-1">
            یہ اندازاً قیمتیں ہیں، حقیقی وقت کی منڈی ریٹ نہیں۔ اصل قیمت ضلع، معیار، اور روزانہ مارکیٹ کی صورتحال کے
            مطابق مختلف ہو سکتی ہے — سودا کرنے سے پہلے اپنی مقامی منڈی سے تصدیق ضرور کریں۔
          </p>
        </div>
      </div>

      {/* Province selector */}
      <div className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="flex-1 input"
          >
            {PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.en} / {p.ur}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-3 rounded-full bg-farm-600 text-white font-semibold shadow-card hover:bg-farm-700 hover:shadow-card-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            {loading ? "Searching..." : "Get Prices"}
          </button>
        </div>
      </div>

      {loading && <LoadingSpinner label="Fetching prices..." />}
      {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 text-sm">⚠️ {error}</div>}

      {searched && !loading && !error && prices && (
        <div className="space-y-4">
          {note && <p className="text-sm text-gray-400">{note}</p>}
          {prices.map((p, i) => (
            <motion.div
              key={p.crop}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-farm-100 shadow-card p-5 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-farm-700">{p.crop}</h3>
                <p className="text-xs text-gray-400 mb-1">{p.unit}</p>
                <p className="text-sm text-gray-600">{p.note}</p>
                <p className="urdu-text text-sm text-farm-700 mt-1">{p.urduNote}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-extrabold text-farm-600">Rs {p.priceRangePKR}</div>
                <div className="text-xs text-gray-400">{p.unit}</div>
              </div>
            </motion.div>
          ))}
          {prices.length === 0 && (
            <div className="text-sm text-gray-400 text-center py-10 bg-white rounded-2xl border border-farm-100">
              No price data available for this province yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
