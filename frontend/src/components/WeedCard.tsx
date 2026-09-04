import { motion } from "framer-motion";
import { Bug, TrendingDown, Clock, Sprout, Wrench, FlaskConical, ShieldCheck } from "lucide-react";
import type { WeedEntry } from "@/types";

export default function WeedCard({ weed }: { weed: WeedEntry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-farm-100 shadow-card p-6"
    >
      <div className="mb-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <span className="px-2 py-0.5 rounded-full bg-farm-50 text-farm-600 font-medium">{weed.type}</span>
          <span>·</span>
          <span>{weed.affectedCrops.join(", ")}</span>
        </div>
        <h3 className="text-xl font-extrabold text-farm-700">
          {weed.nameRomanUrdu} <span className="text-gray-400 font-medium text-base">({weed.nameEn})</span>
        </h3>
        <p className="urdu-text text-farm-600 text-lg mt-1">{weed.nameUrdu}</p>
      </div>

      <div className="space-y-4">
        <Section icon={<Bug className="w-4 h-4" />} title="How to Identify" text={weed.identification} tone="gray" />
        <Section icon={<TrendingDown className="w-4 h-4" />} title="Yield Loss Impact" text={weed.yieldLoss} tone="red" />
        <Section
          icon={<Bug className="w-4 h-4" />}
          title="Role in Hosting Pests & Diseases"
          text={weed.pestDiseaseHostRole}
          tone="amber"
        />
        <Section icon={<Clock className="w-4 h-4" />} title="Critical Control Period" text={weed.criticalPeriod} tone="blue" />

        <div className="rounded-xl border border-farm-100 p-4 bg-farm-50/50">
          <div className="font-semibold text-sm text-farm-700 mb-3">🛡️ Control Methods</div>
          <div className="space-y-3">
            <MiniRow icon={<Sprout className="w-3.5 h-3.5" />} label="Cultural" text={weed.controlCultural} />
            <MiniRow icon={<Wrench className="w-3.5 h-3.5" />} label="Mechanical" text={weed.controlMechanical} />
            <MiniRow icon={<FlaskConical className="w-3.5 h-3.5" />} label="Chemical" text={weed.controlChemical} />
          </div>
        </div>

        <Section icon={<ShieldCheck className="w-4 h-4" />} title="Prevention" text={weed.prevention} tone="green" />

        {/* Urdu solution summary — for farmers who read Urdu */}
        <div className="rounded-xl border border-farm-200 p-4 bg-farm-50">
          <div className="font-semibold text-sm text-farm-700 mb-2">📖 اردو میں خلاصہ اور حل</div>
          <p className="urdu-text text-sm text-gray-700 leading-loose">{weed.urduSummary}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 italic">
        ⚠️ Always confirm herbicide products, doses, and local resistance issues with your nearest
        agriculture extension office before spraying.
      </p>
    </motion.div>
  );
}

function Section({
  icon,
  title,
  text,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: "gray" | "red" | "amber" | "blue" | "green";
}) {
  const toneClasses: Record<string, string> = {
    gray: "bg-gray-50 text-gray-700 border-gray-100",
    red: "bg-red-50 text-red-700 border-red-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    blue: "bg-sky-50 text-sky-700 border-sky-100",
    green: "bg-farm-50 text-farm-700 border-farm-100",
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

function MiniRow({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <div className="flex items-center gap-1 font-semibold text-farm-600 min-w-[92px]">
        {icon}
        {label}
      </div>
      <p className="text-gray-600 flex-1">{text}</p>
    </div>
  );
}
