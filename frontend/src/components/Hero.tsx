import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FarmerIllustration from "./illustrations/FarmerIllustration";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-farm-600 via-farm-500 to-farm-400 rounded-3xl mx-4 sm:mx-6 mt-6 shadow-card-hover">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={`inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4 backdrop-blur-sm ${isRTL ? "urdu-text" : ""}`}>
            🇵🇰 {t.home.heroTagline}
          </span>
          <h1 className={`text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 ${isRTL ? "urdu-text" : ""}`}>
            {t.home.heroTitle} {!isRTL && <span className="text-wheat-200">Pakistan</span>}
          </h1>
          <p className={`text-farm-50 text-lg leading-relaxed mb-8 max-w-lg ${isRTL ? "urdu-text" : ""}`}>
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/disease-detection"
              className="px-6 py-3 rounded-full bg-white text-farm-700 font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              🌱 {t.home.scanPlant}
            </Link>
            <Link
              to="/crop-advisor"
              className="px-6 py-3 rounded-full bg-farm-800/40 text-white font-semibold border border-white/30 backdrop-blur-sm hover:bg-farm-800/60 hover:-translate-y-0.5 transition-all"
            >
              🌾 {t.home.getCropAdvice}
            </Link>
            <Link
              to="/how-to-use"
              className="px-6 py-3 rounded-full bg-transparent text-white font-semibold border border-white/50 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              📺 {isRTL ? "استعمال کا طریقہ دیکھیں" : "How to Use"}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-card-hover bg-white/10"
        >
          <FarmerIllustration className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Decorative floating leaves */}
      <motion.div
        className="absolute -top-6 left-10 text-4xl opacity-40"
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        🌿
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-16 text-3xl opacity-30"
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🍃
      </motion.div>
    </section>
  );
}
