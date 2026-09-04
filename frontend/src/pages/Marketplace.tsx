import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MapPin, Store, Search, Store as StoreIcon } from "lucide-react";
import LocationButton from "@/components/LocationButton";
import MapView from "@/components/MapView";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getFertilizerRecommendation } from "@/api/client";
import { useLanguage } from "@/context/LanguageContext";
import type { MarketplaceResult, ApiError, NearbyRetailer } from "@/types";

const CROPS = ["wheat", "rice", "cotton", "sugarcane", "maize", "chickpea", "mango", "potato"];

export default function Marketplace() {
  const { t, isRTL } = useLanguage();
  const [crop, setCrop] = useState("wheat");
  const [location, setLocation] = useState<{ lat: number; lon: number; label?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarketplaceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const res = await getFertilizerRecommendation(
      crop,
      location ? { lat: location.lat, lon: location.lon } : undefined
    );
    if (res.success) setResult(res as MarketplaceResult);
    else setError((res as ApiError).error);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-4xl">🛒</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>
          {t.pages.marketplaceTitle}
        </h1>
        <p className={`text-gray-500 mt-1 max-w-2xl ${isRTL ? "urdu-text" : ""}`}>{t.pages.marketplaceSubtitle}</p>
      </motion.div>

      {/* Search controls */}
      <section className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 mb-6">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Crop</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-farm-200 focus:outline-none focus:ring-2 focus:ring-farm-400 text-sm capitalize"
            >
              {CROPS.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1.5 block">Your Location (optional)</label>
            <LocationButton onResolved={(lat, lon, placeName) => setLocation({ lat, lon, label: placeName })} />
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-farm-600 text-white font-semibold shadow-card hover:bg-farm-700 hover:shadow-card-hover transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {loading ? "Searching..." : "Find Fertilizer & Nearby Shops"}
        </button>
      </section>

      {loading && <LoadingSpinner label="Finding recommendations..." />}
      {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 text-sm mb-6">⚠️ {error}</div>}

      {result && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fertilizer recommendations */}
          <div>
            <h2 className="font-bold text-farm-700 mb-4">🧪 Recommended Fertilizer</h2>
            {result.note && <p className="text-sm text-gray-400 mb-3">{result.note}</p>}
            <div className="space-y-4">
              {result.fertilizers.map((f) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-farm-100 shadow-card p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-farm-700">{f.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-farm-50 text-farm-600 font-medium">
                      {f.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{f.purpose}</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>
                      <b>Dosage:</b> {f.dosagePerAcre}
                    </div>
                    <div>
                      <b>Timing:</b> {f.timing}
                    </div>
                    <div>
                      <b>Approx. Price:</b> {f.approxPriceRangePKR}
                    </div>
                  </div>
                  <p className="urdu-text text-sm text-farm-700 bg-farm-50 rounded-lg p-3 mt-3 leading-loose">
                    {f.urduNote}
                  </p>
                </motion.div>
              ))}
              {result.fertilizers.length === 0 && (
                <div className="text-sm text-gray-400 text-center py-6">No fertilizer guide found for this crop yet.</div>
              )}
            </div>
          </div>

          {/* Nearby retailers */}
          <div>
            <h2 className="font-bold text-farm-700 mb-4">🏪 Nearby Retailers</h2>
            {!location && (
              <div className="text-sm text-gray-400 bg-farm-50/50 border border-farm-100 rounded-2xl p-5 mb-4">
                Tap "Use My GPS Location" above to find retailers near you.
              </div>
            )}
            {location && result.nearbyRetailers.length === 0 && (
              <div className="text-sm text-gray-400 bg-farm-50/50 border border-farm-100 rounded-2xl p-5 mb-4">
                No verified retailers found near you yet. Retailers are added as they join —
                check back soon, or{" "}
                <Link to="/retailer-signup" className="text-farm-600 font-semibold underline">
                  invite your local shop to join
                </Link>
                .
              </div>
            )}
            <div className="space-y-3 mb-4">
              {result.nearbyRetailers.map((r) => (
                <RetailerCard key={r.id} retailer={r} />
              ))}
            </div>
            {location && (
              <MapView
                pin={{ lat: location.lat, lon: location.lon, label: location.label || "You" }}
                className="h-64"
              />
            )}
          </div>
        </div>
      )}

      {/* Crop prices CTA */}
      <div className="mt-6 bg-white rounded-2xl border border-farm-100 shadow-card p-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-farm-700">💰 Want to know what your crop is worth?</h3>
          <p className="text-sm text-gray-500">Check indicative market prices by province before you sell.</p>
        </div>
        <Link
          to="/crop-prices"
          className="px-5 py-2.5 rounded-full bg-farm-600 text-white text-sm font-semibold whitespace-nowrap hover:bg-farm-700 transition-colors"
        >
          View Prices
        </Link>
      </div>

      {/* Retailer CTA */}
      <div className="mt-10 bg-gradient-to-br from-wheat-500 to-wheat-600 rounded-3xl p-8 text-center text-white shadow-card">
        <StoreIcon className="w-10 h-10 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">Own a fertilizer, pesticide, or seed shop?</h3>
        <p className="text-wheat-50 mb-1">Join our marketplace so nearby farmers can find you.</p>
        <p className="urdu-text text-wheat-50 mb-5">اپنی دکان کو مارکیٹ پلیس میں شامل کریں تاکہ قریبی کسان آپ کو تلاش کر سکیں۔</p>
        <Link
          to="/retailer-signup"
          className="inline-block px-8 py-3 rounded-full bg-white text-wheat-700 font-semibold shadow-card hover:-translate-y-0.5 transition-all"
        >
          <Store className="w-4 h-4 inline mr-2" />
          Register Your Shop
        </Link>
      </div>
    </div>
  );
}

function RetailerCard({ retailer }: { retailer: NearbyRetailer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-farm-100 shadow-card p-4 flex items-start justify-between gap-3"
    >
      <div>
        <div className="font-bold text-farm-700 flex items-center gap-1.5">
          <Store className="w-4 h-4" />
          {retailer.businessName}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {retailer.city} {retailer.address ? `— ${retailer.address}` : ""}
        </div>
        <a
          href={`tel:${retailer.phone}`}
          className="text-sm text-farm-600 font-medium flex items-center gap-1.5 mt-1 hover:underline"
        >
          <Phone className="w-3.5 h-3.5" />
          {retailer.phone}
        </a>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-lg font-extrabold text-farm-600">{retailer.distanceKm} km</div>
        <div className="text-xs text-gray-400">away</div>
      </div>
    </motion.div>
  );
}
