import { Link } from "react-router-dom";
import { Sprout, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { to: "/disease-detection", en: "Disease Detection", ur: "بیماری کی تشخیص", emoji: "🌱" },
    { to: "/crop-advisor", en: "Crop Advisor", ur: "فصل کا مشورہ", emoji: "🌾" },
    { to: "/weed-management", en: "Weed Management", ur: "جڑی بوٹیوں کا انتظام", emoji: "🌿" },
    { to: "/marketplace", en: "Marketplace", ur: "مارکیٹ پلیس", emoji: "🛒" },
    { to: "/crop-prices", en: "Crop Prices", ur: "فصلوں کی قیمتیں", emoji: "💰" },
    { to: "/how-to-use", en: "How to Use", ur: "استعمال کا طریقہ", emoji: "📺" },
    { to: "/assistant", en: "AI Assistant", ur: "AI معاون", emoji: "🤖" },
  ];

  return (
    <footer className="bg-farm-800 text-farm-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-6 h-6 text-farm-300" />
            <span className="font-bold text-white text-lg">Smart Farming AI Pakistan</span>
          </div>
          <p className="text-sm text-farm-200 leading-relaxed mb-3">{t.footer.about}</p>
          <p className="urdu-text text-sm text-farm-200 leading-relaxed">{t.footer.about}</p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">
            {t.footer.quickLinks} <span className="urdu-text inline-block">/ فوری روابط</span>
          </h4>
          <ul className="text-sm text-farm-200 space-y-2">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white transition-colors flex items-center gap-2 flex-wrap">
                  <span>{link.emoji}</span>
                  <span>{link.en}</span>
                  <span className="text-farm-400">•</span>
                  <span className="urdu-text">{link.ur}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Important / اہم نوٹ</h4>
          <div className="flex items-start gap-2 text-sm text-farm-200 leading-relaxed mb-3">
            <ShieldAlert className="w-8 h-8 flex-shrink-0 text-wheat-400" />
            <p>{t.footer.disclaimer}</p>
          </div>
          <p className="urdu-text text-sm text-farm-200 leading-relaxed">{t.footer.disclaimer}</p>
        </div>
      </div>

      <div className="border-t border-farm-700 py-4 text-center text-xs text-farm-300">
        🇵🇰 {t.footer.madeFor} &nbsp;•&nbsp; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
