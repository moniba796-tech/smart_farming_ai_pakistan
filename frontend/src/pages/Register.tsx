import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Register() {
  const { register } = useAuth();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await register(form);
    setSubmitting(false);
    if (res.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(res.error || "Registration failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-farm-500 flex items-center justify-center mx-auto mb-3">
          <UserPlus className="w-7 h-7 text-white" />
        </div>
        <h1 className={`text-2xl font-extrabold text-farm-700 ${isRTL ? "urdu-text" : ""}`}>
          {isRTL ? "اکاؤنٹ بنائیں" : "Create Account"}
        </h1>
        <p className={`text-sm text-gray-500 mt-1 ${isRTL ? "urdu-text" : ""}`}>
          {isRTL ? "اپنی فصلوں اور تاریخ کو محفوظ رکھنے کے لیے سائن اپ کریں" : "Sign up to save your history and get personalized advice"}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1.5 block">Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1.5 block">Phone Number</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="input"
            placeholder="03001234567"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1.5 block">Password</label>
          <input
            required
            type="password"
            minLength={6}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="input"
          />
          <p className="text-xs text-gray-400 mt-1">At least 6 characters</p>
        </div>

        {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm">⚠️ {error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-full bg-farm-600 text-white font-semibold shadow-card hover:bg-farm-700 hover:shadow-card-hover transition-all disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-farm-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
