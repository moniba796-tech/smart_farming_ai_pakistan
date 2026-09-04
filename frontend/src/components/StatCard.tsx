import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-farm-100 shadow-card p-5 flex items-center gap-4"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="text-xl font-extrabold text-farm-700">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </motion.div>
  );
}

export function FeatureCard({
  to,
  icon,
  title,
  description,
  emoji,
  delay = 0,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  description: string;
  emoji: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="group block h-full bg-white rounded-3xl border border-farm-100 shadow-card hover:shadow-card-hover p-6 transition-all hover:-translate-y-1"
      >
        <div className="w-16 h-16 rounded-2xl bg-farm-50 flex items-center justify-center mb-4 group-hover:bg-farm-100 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-farm-700 mb-1.5">
          {emoji} {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        <span className="inline-flex items-center gap-1 text-farm-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
          Open →
        </span>
      </Link>
    </motion.div>
  );
}
