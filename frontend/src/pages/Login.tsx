import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Login() {
  const { login } = useAuth();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: string })?.from || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await login({ identifier, password });
    setSubmitting(false);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || "Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-farm-500 flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <h1 className={`text-2xl font-extrabold text-farm-700 ${isRTL ? "urdu-text" : ""}`}>
          {isRTL ? "لاگ ان کریں" : "Log In"}
        </h1>
        <p className={`text-sm text-gray-500 mt-1 ${isRTL ? "urdu-text" : ""}`}>
          {isRTL ? "اپنے فارمنگ اکاؤنٹ میں داخل ہوں" : "Welcome back to your farming account"}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1.5 block">Email or Phone Number</label>
          <input
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="input"
            placeholder="you@example.com or 03001234567"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1.5 block">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>

        {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm">⚠️ {error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-full bg-farm-600 text-white font-semibold shadow-card hover:bg-farm-700 hover:shadow-card-hover transition-all disabled:opacity-50"
        >
          {submitting ? "Logging in..." : "Log In"}
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-farm-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>

      <div className="mt-6 text-center text-xs text-gray-400">
        Admin? Log in with your admin email and password above too.
      </div>
    </div>
  );
}
