import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WeedCard from "@/components/WeedCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getWeeds } from "@/api/client";
import { useLanguage } from "@/context/LanguageContext";
import type { WeedEntry } from "@/types";

const CROPS = ["All Crops", "Wheat", "Rice", "Cotton", "Sugarcane", "Maize", "Chickpea", "Mango", "Potato"];

export default function WeedManagement() {
  const { t, isRTL } = useLanguage();
  const [crop, setCrop] = useState("All Crops");
  const [weeds, setWeeds] = useState<WeedEntry[]>([]);
  const [selected, setSelected] = useState<WeedEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWeeds(crop === "All Crops" ? undefined : crop.toLowerCase()).then((data) => {
      setWeeds(data);
      setSelected(data[0] ?? null);
      setLoading(false);
    });
  }, [crop]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-4xl">🌿</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>{t.pages.weedTitle}</h1>
        <p className={`text-gray-500 mt-1 max-w-2xl ${isRTL ? "urdu-text" : ""}`}>{t.pages.weedSubtitle}</p>
      </motion.div>

      {/* Crop filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CROPS.map((c) => (
          <button
            key={c}
            onClick={() => setCrop(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              crop === c
                ? "bg-farm-600 text-white shadow-card"
                : "bg-white text-gray-600 border border-farm-100 hover:bg-farm-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner label="Loading weeds..." />
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Weed list */}
          <div className="md:col-span-1 space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {weeds.map((w) => (
              <button
                key={w.key}
                onClick={() => setSelected(w)}
                className={`w-full text-left px-4 py-3 rounded-2xl border transition-all ${
                  selected?.key === w.key
                    ? "bg-farm-600 text-white border-farm-600 shadow-card"
                    : "bg-white text-gray-700 border-farm-100 hover:bg-farm-50"
                }`}
              >
                <div className="font-semibold text-sm">{w.nameRomanUrdu}</div>
                <div className={`text-xs ${selected?.key === w.key ? "text-farm-100" : "text-gray-400"}`}>
                  {w.nameEn}
                </div>
              </button>
            ))}
            {weeds.length === 0 && (
              <div className="text-sm text-gray-400 text-center py-6">No weeds found for this crop.</div>
            )}
          </div>

          {/* Selected weed report */}
          <div className="md:col-span-2">{selected && <WeedCard weed={selected} />}</div>
        </div>
      )}
    </div>
  );
}
