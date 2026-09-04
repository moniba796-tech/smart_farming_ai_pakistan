import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import { StatCard, FeatureCard } from "@/components/StatCard";
import { LeafIcon, SproutIcon, WeedIcon, ChatIcon } from "@/components/illustrations/IconIllustrations";
import { Languages, MapPinned, Mic, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="pb-16">
      <Hero />

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<LeafIcon className="w-10 h-10" />} label="AI Tools" value="5" />
        <StatCard icon={<Languages className="w-9 h-9 text-sky-500" />} label="Languages" value="3" />
        <StatCard icon={<MapPinned className="w-9 h-9 text-farm-500" />} label="GPS Enabled" value="Yes" />
        <StatCard icon={<Mic className="w-9 h-9 text-wheat-500" />} label="Voice Support" value="Free" />
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-2xl md:text-3xl font-extrabold text-farm-700 mb-8 text-center ${isRTL ? "urdu-text" : ""}`}
        >
          {t.home.featuresHeading}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <FeatureCard
            to="/disease-detection"
            emoji="🌱"
            icon={<LeafIcon className="w-9 h-9" />}
            title={t.home.diseaseTitle}
            description={t.home.diseaseDesc}
            delay={0}
          />
          <FeatureCard
            to="/crop-advisor"
            emoji="🌾"
            icon={<SproutIcon className="w-9 h-9" />}
            title={t.home.cropTitle}
            description={t.home.cropDesc}
            delay={0.05}
          />
          <FeatureCard
            to="/weed-management"
            emoji="🌿"
            icon={<WeedIcon className="w-9 h-9" />}
            title={t.home.weedTitle}
            description={t.home.weedDesc}
            delay={0.1}
          />
          <FeatureCard
            to="/assistant"
            emoji="🤖"
            icon={<ChatIcon className="w-9 h-9" />}
            title={t.home.assistantTitle}
            description={t.home.assistantDesc}
            delay={0.15}
          />
          <FeatureCard
            to="/marketplace"
            emoji="🛒"
            icon={<ShoppingCart className="w-9 h-9 text-farm-600" />}
            title={t.home.marketplaceTitle}
            description={t.home.marketplaceDesc}
            delay={0.2}
          />
        </div>
      </div>

      {/* Why section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
        <div className="bg-white rounded-3xl border border-farm-100 shadow-card p-8 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">🆓</div>
            <h4 className="font-bold text-farm-700 mb-1">Free to Use</h4>
            <p className="text-sm text-gray-500">Built entirely on free-tier AI and data services.</p>
            <p className="urdu-text text-sm text-gray-500 mt-1">مکمل طور پر مفت AI اور ڈیٹا سروسز پر بنایا گیا۔</p>
          </div>
          <div>
            <div className="text-3xl mb-2">📍</div>
            <h4 className="font-bold text-farm-700 mb-1">GPS-Aware</h4>
            <p className="text-sm text-gray-500">Auto-detects your region for local weather and advice.</p>
            <p className="urdu-text text-sm text-gray-500 mt-1">مقامی موسم اور مشورے کے لیے آپ کے علاقے کو خود بخود پہچانتا ہے۔</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🗣️</div>
            <h4 className="font-bold text-farm-700 mb-1">Speaks Your Language</h4>
            <p className="text-sm text-gray-500">English, Urdu, and Roman Urdu, including voice input.</p>
            <p className="urdu-text text-sm text-gray-500 mt-1">انگریزی، اردو، اور رومن اردو، آواز کے ذریعے بھی۔</p>
          </div>
        </div>
      </div>
    </div>
  );
}
