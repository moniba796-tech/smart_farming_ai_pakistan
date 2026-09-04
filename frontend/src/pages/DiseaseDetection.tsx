import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "@/components/ImageUploader";
import DiseaseReportCard from "@/components/DiseaseReportCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { analyzePlantImage } from "@/api/client";
import { useLanguage } from "@/context/LanguageContext";
import type { DiseaseResult, ApiError } from "@/types";

export default function DiseaseDetection() {
  const { t, isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const response = await analyzePlantImage(file);
    if (response.success) {
      setResult(response as DiseaseResult);
    } else {
      setError((response as ApiError).error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-4xl">🌱</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>{t.pages.diseaseTitle}</h1>
        <p className={`text-gray-500 mt-1 max-w-xl ${isRTL ? "urdu-text" : ""}`}>{t.pages.diseaseSubtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageUploader onFileSelected={setFile} disabled={loading} />
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-5 w-full py-3.5 rounded-full bg-farm-600 text-white font-semibold shadow-card hover:bg-farm-700 hover:shadow-card-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "🔍 Analyze Image"}
          </button>
        </div>

        <div>
          {loading && <LoadingSpinner label="Checking your plant for diseases..." />}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 text-sm">
              ⚠️ {error}
            </div>
          )}
          {result && <DiseaseReportCard result={result} />}
          {!loading && !error && !result && (
            <div className="h-full flex items-center justify-center text-center text-gray-400 border-2 border-dashed border-farm-100 rounded-3xl p-10">
              Your disease report will appear here once you upload and analyze an image.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
