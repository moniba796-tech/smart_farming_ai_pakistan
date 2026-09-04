import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut, Store, Users, BarChart3, Check, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  adminGetAnalytics,
  adminListRetailers,
  adminVerifyRetailer,
  adminDeleteRetailer,
} from "@/api/client";
import type { AdminAnalytics, NearbyRetailer, ApiError } from "@/types";

type Tab = "overview" | "retailers";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-4xl">🛠️</span>
          <h1 className="text-3xl font-extrabold text-farm-700 mt-2">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Logged in as {user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </motion.div>

      <div className="flex gap-2 mb-6">
        <TabButton active={tab === "overview"} onClick={() => setTab("overview")} icon={<BarChart3 className="w-4 h-4" />}>
          Overview
        </TabButton>
        <TabButton active={tab === "retailers"} onClick={() => setTab("retailers")} icon={<Store className="w-4 h-4" />}>
          Retailer Verification
        </TabButton>
      </div>

      {tab === "overview" && <OverviewTab />}
      {tab === "retailers" && <RetailersTab />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
        active ? "bg-farm-600 text-white shadow-card" : "bg-white text-gray-600 border border-farm-100 hover:bg-farm-50"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function OverviewTab() {
  const [data, setData] = useState<AdminAnalytics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetAnalytics().then((res) => {
      if (res.success) setData(res as AdminAnalytics);
      else setError((res as ApiError).error);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner label="Loading analytics..." />;
  if (error) return <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 text-sm">⚠️ {error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatBox icon={<Users className="w-6 h-6" />} label="Farmers" value={data.totals.farmerCount} />
        <StatBox icon={<ShieldCheck className="w-6 h-6" />} label="Disease Scans" value={data.totals.scanCount} />
        <StatBox icon={<BarChart3 className="w-6 h-6" />} label="Crop Recs" value={data.totals.cropRecCount} />
        <StatBox icon={<Store className="w-6 h-6" />} label="Pending Retailers" value={data.totals.pendingRetailers} highlight />
        <StatBox icon={<Store className="w-6 h-6" />} label="Verified Retailers" value={data.totals.verifiedRetailers} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-farm-100 shadow-card p-5">
          <h3 className="font-bold text-farm-700 mb-3">Most Diagnosed Issues</h3>
          {data.topDiseases.length === 0 ? (
            <p className="text-sm text-gray-400">No scans yet.</p>
          ) : (
            <ul className="space-y-2">
              {data.topDiseases.map((d) => (
                <li key={d.name} className="flex justify-between text-sm">
                  <span className="text-gray-600">{d.name}</span>
                  <span className="font-semibold text-farm-600">{d.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-farm-100 shadow-card p-5">
          <h3 className="font-bold text-farm-700 mb-3">Most Recommended Crops</h3>
          {data.topCrops.length === 0 ? (
            <p className="text-sm text-gray-400">No recommendations yet.</p>
          ) : (
            <ul className="space-y-2">
              {data.topCrops.map((c) => (
                <li key={c.name} className="flex justify-between text-sm">
                  <span className="text-gray-600">{c.name}</span>
                  <span className="font-semibold text-farm-600">{c.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center shadow-card ${
        highlight ? "bg-wheat-50 border-wheat-200" : "bg-white border-farm-100"
      }`}
    >
      <div className={`mx-auto mb-1 ${highlight ? "text-wheat-600" : "text-farm-500"}`}>{icon}</div>
      <div className="text-2xl font-extrabold text-farm-700">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function RetailersTab() {
  const [status, setStatus] = useState<"pending" | "verified" | "all">("pending");
  const [retailers, setRetailers] = useState<NearbyRetailer[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    adminListRetailers(status).then((res) => {
      if (res.success) setRetailers((res as { retailers: NearbyRetailer[] }).retailers);
      setLoading(false);
    });
  };

  useEffect(load, [status]);

  const handleVerify = async (id: string) => {
    await adminVerifyRetailer(id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this retailer permanently?")) return;
    await adminDeleteRetailer(id);
    load();
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(["pending", "verified", "all"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              status === s ? "bg-farm-600 text-white" : "bg-farm-50 text-gray-600 hover:bg-farm-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner label="Loading retailers..." />
      ) : retailers.length === 0 ? (
        <div className="text-sm text-gray-400 text-center py-10 bg-white rounded-2xl border border-farm-100">
          No {status !== "all" ? status : ""} retailers found.
        </div>
      ) : (
        <div className="space-y-3">
          {retailers.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-farm-100 shadow-card p-4 flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-bold text-farm-700 flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  {r.businessName}
                  {r.verified && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-farm-50 text-farm-600 font-medium">Verified</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {r.ownerName} — {r.phone} — {r.city}
                </div>
                <div className="text-xs text-gray-400 mt-1">{r.productCategories.join(", ")}</div>
                {r.productsOffered && <div className="text-xs text-gray-400 mt-1">{r.productsOffered}</div>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!r.verified && (
                  <button
                    onClick={() => handleVerify(r.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-farm-600 text-white text-xs font-semibold hover:bg-farm-700 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Verify
                  </button>
                )}
                <button
                  onClick={() => handleDelete(r.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
