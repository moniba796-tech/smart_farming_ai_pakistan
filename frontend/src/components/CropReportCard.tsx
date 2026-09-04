import { motion } from "framer-motion";
import { Wheat, Droplets, FlaskConical, Sprout, Calendar, TrendingUp } from "lucide-react";
import type { CropPrediction } from "@/types";

export default function CropReportCard({ result }: { result: CropPrediction }) {
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-farm-100 shadow-card p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-wheat-50 flex items-center justify-center">
          <Wheat className="w-8 h-8 text-wheat-600" />
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">Recommended Crop</div>
          <h3 className="text-2xl font-extrabold text-farm-700">{result.crop}</h3>
          <div className="text-sm text-farm-500 font-medium">{confidencePct}% match confidence</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <InfoRow icon={<Calendar className="w-4 h-4" />} label="Suitable Season" value={result.season} />
        <InfoRow icon={<Droplets className="w-4 h-4" />} label="Water Requirement" value={result.water} />
        <InfoRow icon={<FlaskConical className="w-4 h-4" />} label="Fertilizer" value={result.fertilizer} />
        <InfoRow icon={<Sprout className="w-4 h-4" />} label="Sowing Method" value={result.sowing} />
        <InfoRow icon={<Calendar className="w-4 h-4" />} label="Harvest Time" value={result.harvest} />
        <InfoRow icon={<TrendingUp className="w-4 h-4" />} label="Expected Yield" value={result.expectedYield} />
      </div>

      {result.alternatives?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Other Suitable Crops</h4>
          <div className="flex flex-wrap gap-2">
            {result.alternatives.map((alt) => (
              <span
                key={alt.crop}
                className="px-3 py-1.5 rounded-full bg-farm-50 text-farm-700 text-sm font-medium border border-farm-100"
              >
                🌱 {alt.crop} — {Math.round(alt.confidence * 100)}%
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Urdu solution summary — for farmers who read Urdu */}
      <div className="rounded-xl border border-farm-200 p-4 bg-farm-50 mt-5">
        <div className="font-semibold text-sm text-farm-700 mb-2">📖 اردو میں خلاصہ اور سفارش</div>
        <p className="urdu-text text-sm text-gray-700 leading-loose">{result.urduSummary}</p>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 bg-farm-50/60 rounded-xl p-3">
      <div className="text-farm-500 mt-0.5">{icon}</div>
      <div>
        <div className="text-xs text-gray-400 font-medium">{label}</div>
        <div className="text-sm text-gray-700">{value}</div>
      </div>
    </div>
  );
}
