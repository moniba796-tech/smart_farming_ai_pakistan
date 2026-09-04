import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import LocationButton from "@/components/LocationButton";
import WeatherCard from "@/components/WeatherCard";
import MapView from "@/components/MapView";
import CropReportCard from "@/components/CropReportCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getWeatherByCity, getWeatherByCoords, recommendCrop } from "@/api/client";
import { useLanguage } from "@/context/LanguageContext";
import type { WeatherResult, CropPrediction, ApiError } from "@/types";

const DEFAULT_INPUTS = { nitrogen: 90, phosphorus: 45, potassium: 45, temperature: 25, humidity: 65, rainfall: 100 };

export default function CropAdvisor() {
  const { t, isRTL } = useLanguage();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [pin, setPin] = useState<{ lat: number; lon: number; label: string } | null>(null);

  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingCrop, setLoadingCrop] = useState(false);
  const [result, setResult] = useState<CropPrediction | null>(null);
  const [cropError, setCropError] = useState<string | null>(null);

  const applyWeather = (w: WeatherResult) => {
    setWeather(w);
    setWeatherError(null);
    setPin({ lat: w.lat, lon: w.lon, label: w.location });
    setInputs((prev) => ({ ...prev, temperature: w.temperature, humidity: w.humidity, rainfall: w.rainfallMm }));
  };

  const handleCitySearch = async () => {
    if (!city.trim()) return;
    setLoadingWeather(true);
    setWeatherError(null);
    const res = await getWeatherByCity(city);
    if (res.success) applyWeather(res as WeatherResult);
    else setWeatherError((res as ApiError).error);
    setLoadingWeather(false);
  };

  const handleGPS = async (lat: number, lon: number) => {
    setLoadingWeather(true);
    setWeatherError(null);
    const res = await getWeatherByCoords(lat, lon);
    if (res.success) applyWeather(res as WeatherResult);
    else setWeatherError((res as ApiError).error);
    setLoadingWeather(false);
  };

  const handleRecommend = async () => {
    setLoadingCrop(true);
    setCropError(null);
    setResult(null);
    const res = await recommendCrop({
      ...inputs,
      lat: pin?.lat,
      lon: pin?.lon,
    });
    if (res.success) setResult(res as CropPrediction);
    else setCropError((res as ApiError).error);
    setLoadingCrop(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-4xl">🌾</span>
        <h1 className={`text-3xl font-extrabold text-farm-700 mt-2 ${isRTL ? "urdu-text" : ""}`}>{t.pages.cropTitle}</h1>
        <p className={`text-gray-500 mt-1 max-w-xl ${isRTL ? "urdu-text" : ""}`}>{t.pages.cropSubtitle}</p>
      </motion.div>

      {/* Step 1: Location */}
      <section className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 mb-6">
        <h2 className="font-bold text-farm-700 mb-4">Step 1 — Set Your Location</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCitySearch()}
              placeholder="e.g. Faisalabad, Multan, Larkana..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-farm-200 focus:outline-none focus:ring-2 focus:ring-farm-400 text-sm"
            />
          </div>
          <button
            onClick={handleCitySearch}
            className="px-6 py-3 rounded-full bg-farm-600 text-white font-semibold hover:bg-farm-700 transition-colors"
          >
            ☁️ Fetch Weather
          </button>
        </div>
        <LocationButton onResolved={handleGPS} />

        {loadingWeather && <LoadingSpinner label="Fetching weather..." />}
        {weatherError && (
          <div className="mt-4 bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 text-sm">
            ⚠️ {weatherError}
          </div>
        )}
        {weather && (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <WeatherCard weather={weather} />
            <MapView pin={pin} className="h-56" />
          </div>
        )}
      </section>

      {/* Step 2: Inputs */}
      <section className="bg-white rounded-3xl border border-farm-100 shadow-card p-6 mb-6">
        <h2 className="font-bold text-farm-700 mb-4">Step 2 — Soil & Climate</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <SliderField label="Nitrogen (N)" value={inputs.nitrogen} min={0} max={150} onChange={(v) => setInputs((p) => ({ ...p, nitrogen: v }))} />
          <SliderField label="Phosphorus (P)" value={inputs.phosphorus} min={0} max={150} onChange={(v) => setInputs((p) => ({ ...p, phosphorus: v }))} />
          <SliderField label="Potassium (K)" value={inputs.potassium} min={0} max={150} onChange={(v) => setInputs((p) => ({ ...p, potassium: v }))} />
          <SliderField label="Temperature (°C)" value={inputs.temperature} min={-5} max={50} onChange={(v) => setInputs((p) => ({ ...p, temperature: v }))} />
          <SliderField label="Humidity (%)" value={inputs.humidity} min={0} max={100} onChange={(v) => setInputs((p) => ({ ...p, humidity: v }))} />
          <SliderField label="Rainfall (mm)" value={inputs.rainfall} min={0} max={400} onChange={(v) => setInputs((p) => ({ ...p, rainfall: v }))} />
        </div>

        <button
          onClick={handleRecommend}
          disabled={loadingCrop}
          className="mt-6 w-full sm:w-auto px-8 py-3.5 rounded-full bg-wheat-500 text-white font-semibold shadow-card hover:bg-wheat-600 hover:shadow-card-hover transition-all disabled:opacity-50"
        >
          {loadingCrop ? "Calculating..." : "🌾 Get Crop Recommendation"}
        </button>
      </section>

      {/* Result */}
      {loadingCrop && <LoadingSpinner label="Finding your best crop match..." />}
      {cropError && (
        <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-5 text-sm mb-6">⚠️ {cropError}</div>
      )}
      {result && <CropReportCard result={result} />}

      {/* Map (default, before any location chosen) */}
      {!weather && (
        <section className="mt-6">
          <h2 className="font-bold text-farm-700 mb-4">🗺️ Pakistan Agricultural Map</h2>
          <MapView />
        </section>
      )}
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-bold text-farm-600">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-farm-600"
      />
    </div>
  );
}
