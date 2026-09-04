import { motion } from "framer-motion";
import { Droplets, Wind, CloudRain, Thermometer } from "lucide-react";
import type { WeatherResult } from "@/types";

export default function WeatherCard({ weather }: { weather: WeatherResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-sky-50 to-farm-50 rounded-2xl border border-sky-100 p-5 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-farm-700">🌤️ Weather — {weather.location}</h3>
        <span className="text-2xl font-extrabold text-sky-600">{weather.temperature}°C</span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Thermometer className="w-4 h-4 text-wheat-500" />
          Feels like {weather.feelsLike}°C
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Droplets className="w-4 h-4 text-sky-500" />
          {weather.humidity}% humidity
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Wind className="w-4 h-4 text-gray-400" />
          {weather.windSpeedKmph} km/h wind
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CloudRain className="w-4 h-4 text-sky-400" />
          {weather.rainfallMm} mm rain
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400">{weather.condition}</div>
    </motion.div>
  );
}
