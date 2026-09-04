import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProtectedRoute from "@/components/ProtectedRoute";

// Code-split the heavier pages (react-leaflet especially) so the initial
// bundle stays small and the homepage loads fast.
const DiseaseDetection = lazy(() => import("@/pages/DiseaseDetection"));
const CropAdvisor = lazy(() => import("@/pages/CropAdvisor"));
const WeedManagement = lazy(() => import("@/pages/WeedManagement"));
const AIAssistant = lazy(() => import("@/pages/AIAssistant"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const RetailerSignup = lazy(() => import("@/pages/RetailerSignup"));
const HowToUse = lazy(() => import("@/pages/HowToUse"));
const CropPrices = lazy(() => import("@/pages/CropPrices"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const DashboardRouter = lazy(() => import("@/pages/DashboardRouter"));

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-farm-50">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner label="Loading..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/crop-advisor" element={<CropAdvisor />} />
            <Route path="/weed-management" element={<WeedManagement />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/retailer-signup" element={<RetailerSignup />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/crop-prices" element={<CropPrices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
