import { motion } from "framer-motion";
import { Leaf, AlertCircle, Sprout, FlaskConical, ShieldCheck } from "lucide-react";
import type { DiseaseResult } from "@/types";

export default function DiseaseReportCard({ result }: { result: DiseaseResult }) {
  const confidencePct = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-farm-100 shadow-card p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-50 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-farm-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-farm-700">{result.name}</h3>
            <span className="text-xs text-gray-400">Raw label: {result.rawLabel}</span>
            {result.method && (
              <span
                className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  result.method === "gemini" ? "bg-sky-50 text-sky-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                {result.method === "gemini" ? "Diagnosed by Gemini AI" : "Diagnosed by backup model"}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-farm-600">{confidencePct}%</div>
          <div className="text-xs text-gray-400">confidence</div>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="w-full h-2 rounded-full bg-farm-50 overflow-hidden mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidencePct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-farm-400 to-farm-600 rounded-full"
        />
      </div>

      <div className="space-y-4">
        <ReportSection icon={<AlertCircle className="w-4 h-4" />} title="Symptoms" text={result.symptoms} tone="amber" />
        <ReportSection icon={<AlertCircle className="w-4 h-4" />} title="Causes" text={result.causes} tone="gray" />
        <ReportSection icon={<Sprout className="w-4 h-4" />} title="Organic Treatment" text={result.organicTreatment} tone="green" />
        <ReportSection icon={<FlaskConical className="w-4 h-4" />} title="Chemical Treatment" text={result.chemicalTreatment} tone="blue" />
        <ReportSection icon={<ShieldCheck className="w-4 h-4" />} title="Prevention" text={result.prevention} tone="green" />
      </div>
    </motion.div>
  );
}

function ReportSection({
  icon,
  title,
  text,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: "amber" | "gray" | "green" | "blue";
}) {
  const toneClasses: Record<string, string> = {
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    gray: "bg-gray-50 text-gray-700 border-gray-100",
    green: "bg-farm-50 text-farm-700 border-farm-100",
    blue: "bg-sky-50 text-sky-700 border-sky-100",
  };
  return (
    <div className={`rounded-xl border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-center gap-2 font-semibold text-sm mb-1">
        {icon}
        {title}
      </div>
      <p className="text-sm leading-relaxed opacity-90">{text}</p>
    </div>
  );
}
