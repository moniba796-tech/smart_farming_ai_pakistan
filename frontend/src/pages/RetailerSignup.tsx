import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import LocationButton from "@/components/LocationButton";
import { registerRetailer } from "@/api/client";
import { useLanguage } from "@/context/LanguageContext";
import type { ProductCategory, RetailerRegistrationInput } from "@/types";

const CATEGORY_OPTIONS: { value: ProductCategory; label: string; labelUr: string }[] = [
  { value: "fertilizer", label: "Fertilizer", labelUr: "کھاد" },
  { value: "pesticide", label: "Pesticide / Crop Medicine", labelUr: "کیڑے مار ادویات" },
  { value: "seeds", label: "Seeds", labelUr: "بیج" },
  { value: "equipment", label: "Equipment", labelUr: "آلات" },
  { value: "other", label: "Other", labelUr: "دیگر" },
];

const emptyForm: RetailerRegistrationInput = {
  businessName: "",
  ownerName: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  lat: 0,
  lon: 0,
  productCategories: ["fertilizer"],
  productsOffered: "",
};

export default function RetailerSignup() {
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState<RetailerRegistrationInput>(emptyForm);
  const [locationSet, setLocationSet] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleCategory = (cat: ProductCategory) => {
    setForm((f) => ({
      ...f,
      productCategories: f.productCategories.includes(cat)
        ? f.productCategories.filter((c) => c !== cat)
        : [...f.productCategories, cat],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationSet) {
      setError("Please set your shop's location using the GPS button first.");
      return;
    }
    setSubmitting(true);
    setError(null);
    const res = await registerRetailer(form);
    setSubmitting(false);
    if (res.success) {
      setSuccess((res as { message: string }).message);
      setForm(emptyForm);
      setLocationSet(false);
    } else {
      setError((res as { error: string }).error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <span className="text-4xl">🏪</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>
          {t.pages.retailerSignupTitle}
        </h1>
        <p className={`text-gray-500 mt-1 ${isRTL ? "urdu-text" : ""}`}>{t.pages.retailerSignupSubtitle}</p>
      </motion.div>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-farm-50 border border-farm-100 rounded-3xl p-8 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-farm-600 mx-auto mb-3" />
          <h3 className="font-bold text-farm-700 mb-1">Thank you!</h3>
          <p className="text-sm text-gray-600">{success}</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Business / Shop Name">
              <input
                required
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="Owner Name">
              <input
                required
                value={form.ownerName}
                onChange={(e) => setForm((f) => ({ ...f, ownerName: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="Phone Number">
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="Email (optional)">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="City">
              <input
                required
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="input"
              />
            </Field>
            <Field label="Address (optional)">
              <input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className="input"
              />
            </Field>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">Shop Location (GPS)</label>
            <LocationButton
              onResolved={(lat, lon) => {
                setForm((f) => ({ ...f, lat, lon }));
                setLocationSet(true);
              }}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">What do you sell?</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => toggleCategory(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    form.productCategories.includes(opt.value)
                      ? "bg-farm-600 text-white"
                      : "bg-farm-50 text-gray-600 border border-farm-100 hover:bg-farm-100"
                  }`}
                >
                  {opt.label} <span className="urdu-text">/ {opt.labelUr}</span>
                </button>
              ))}
            </div>
          </div>

          <Field label="Products Offered (brief description, optional)">
            <textarea
              value={form.productsOffered}
              onChange={(e) => setForm((f) => ({ ...f, productsOffered: e.target.value }))}
              rows={3}
              className="input resize-none"
              placeholder="e.g. DAP, Urea, NPK compounds, common pesticides..."
            />
          </Field>

          {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm">⚠️ {error}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-farm-600 text-white font-semibold shadow-card hover:bg-farm-700 hover:shadow-card-hover transition-all disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit for Review"}
          </button>
          <p className="text-xs text-gray-400 text-center">
            Your shop will be reviewed by our team before appearing to farmers on the marketplace.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
