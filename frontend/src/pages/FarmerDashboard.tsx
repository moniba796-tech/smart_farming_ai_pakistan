import { useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, Sprout, LogOut, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { updateMyProfile } from "@/api/client";
import LocationButton from "@/components/LocationButton";
import { useNavigate } from "react-router-dom";

export default function FarmerDashboard() {
  const { user, logout, refreshUser } = useAuth();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  const [farmSizeAcres, setFarmSizeAcres] = useState(user?.farmSizeAcres ?? "");
  const [primaryCrops, setPrimaryCrops] = useState(user?.primaryCrops?.join(", ") ?? "");
  const [location, setLocation] = useState(user?.location);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await updateMyProfile({
      farmSizeAcres: farmSizeAcres === "" ? undefined : Number(farmSizeAcres),
      primaryCrops: primaryCrops
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      location,
    });
    await refreshUser();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-4xl">👨‍🌾</span>
          <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>
            {isRTL ? `خوش آمدید، ${user.name}` : `Welcome, ${user.name}`}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </motion.div>

      {/* Profile card */}
      <div className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 mb-6">
        <h2 className="font-bold text-farm-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> My Profile
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-xs text-gray-400">Email</div>
            <div className="text-gray-700">{user.email}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Phone</div>
            <div className="text-gray-700">{user.phone}</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Farm Size (acres)</label>
            <input
              type="number"
              min={0}
              value={farmSizeAcres}
              onChange={(e) => setFarmSizeAcres(e.target.value === "" ? "" : Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Primary Crops (comma separated)</label>
            <input
              value={primaryCrops}
              onChange={(e) => setPrimaryCrops(e.target.value)}
              className="input"
              placeholder="Wheat, Cotton"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-600 mb-2 block flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Farm Location
          </label>
          {location ? (
            <div className="text-sm text-gray-600 bg-farm-50 rounded-lg p-3 mb-2">
              {location.district ? `${location.district}, ` : ""}
              {location.province || location.displayName || `${location.lat.toFixed(3)}, ${location.lon.toFixed(3)}`}
            </div>
          ) : (
            <div className="text-sm text-gray-400 mb-2">No location set yet.</div>
          )}
          <LocationButton
            onResolved={(lat, lon, placeName) => setLocation({ lat, lon, displayName: placeName })}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-farm-600 text-white text-sm font-semibold hover:bg-farm-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Quick links to feature history — placeholder cards pointing to features */}
      <div className="grid sm:grid-cols-3 gap-4">
        <QuickLink emoji="🌱" label="Scan History" to="/disease-detection" />
        <QuickLink emoji="🌾" label="Crop Recommendations" to="/crop-advisor" />
        <QuickLink emoji="🛒" label="Marketplace" to="/marketplace" />
      </div>
    </div>
  );
}

function QuickLink({ emoji, label, to }: { emoji: string; label: string; to: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-white rounded-2xl border border-farm-100 shadow-card p-5 text-center hover:-translate-y-0.5 hover:shadow-card-hover transition-all"
    >
      <div className="text-2xl mb-2">
        <Sprout className="w-6 h-6 mx-auto text-farm-500" />
      </div>
      <div className="text-sm font-semibold text-gray-700">
        {emoji} {label}
      </div>
    </button>
  );
}
