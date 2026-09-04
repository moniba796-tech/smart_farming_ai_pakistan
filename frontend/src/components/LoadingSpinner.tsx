import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

export default function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-farm-100 border-t-farm-500 flex items-center justify-center"
      >
        <Sprout className="w-5 h-5 text-farm-500" />
      </motion.div>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
    </div>
  );
}

export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return <div className={`shimmer-bg rounded-lg ${className}`} />;
}
