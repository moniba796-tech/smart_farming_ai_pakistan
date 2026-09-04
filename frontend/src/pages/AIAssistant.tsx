import { motion } from "framer-motion";
import ChatWindow from "@/components/ChatWindow";
import { useLanguage } from "@/context/LanguageContext";

export default function AIAssistant() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <span className="text-4xl">🤖</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>
          {t.pages.assistantTitle}
        </h1>
        <p className={`text-gray-500 mt-1 max-w-xl mx-auto ${isRTL ? "urdu-text" : ""}`}>
          {t.pages.assistantSubtitle}
        </p>
      </motion.div>

      <ChatWindow />
    </div>
  );
}
