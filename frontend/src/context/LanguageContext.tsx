/**
 * context/LanguageContext.tsx
 * -----------------------------
 * App-wide UI language toggle (English / Urdu). Persists the farmer's
 * choice in localStorage so it's remembered on their next visit, and
 * flips the document direction to RTL when Urdu is selected so Urdu
 * script and layout read correctly.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type UILanguage, type TranslationShape } from "@/i18n/translations";

interface LanguageContextValue {
  lang: UILanguage;
  setLang: (lang: UILanguage) => void;
  toggleLang: () => void;
  t: TranslationShape;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "sfa_ui_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UILanguage>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    return saved === "ur" ? "ur" : "en";
  });

  const setLang = (next: UILanguage) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const toggleLang = () => setLang(lang === "en" ? "ur" : "en");

  useEffect(() => {
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
    // Note: we deliberately do NOT flip the whole document to dir="rtl" —
    // the layout (nav, cards, icons) is built LTR-first. Instead, Urdu text
    // blocks use the local `.urdu-text` class (direction: rtl, right-aligned)
    // so Urdu content reads correctly without mirroring the entire UI.
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: translations[lang],
    isRTL: lang === "ur",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
