import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, LocateFixed, Loader2, AlertTriangle } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";

interface Props {
  onResolved: (lat: number, lon: number, placeName?: string) => void;
}

/**
 * A single tap/click button that uses the browser's GPS (navigator.geolocation)
 * to detect the farmer's location, then resolves it to a readable place name
 * via the backend's free Nominatim reverse-geocoding endpoint.
 */
export default function LocationButton({ onResolved }: Props) {
  const { status, place, error, lat, lon, locate } = useGeolocation();
  const notifiedRef = useRef<string | null>(null);

  // Fire the callback exactly once per successful resolution (avoids
  // re-triggering on every re-render, since parent state updates re-render us).
  useEffect(() => {
    if (status === "success" && lat !== undefined && lon !== undefined) {
      const key = `${lat},${lon}`;
      if (notifiedRef.current !== key) {
        notifiedRef.current = key;
        onResolved(lat, lon, place?.displayName);
      }
    }
  }, [status, lat, lon, place, onResolved]);

  const handleClick = () => {
    locate();
  };

  return (
    <div>
      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.96 }}
        disabled={status === "locating" || status === "resolving"}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100 font-medium text-sm hover:bg-sky-100 transition-colors disabled:opacity-60"
      >
        {status === "locating" || status === "resolving" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {status === "locating" ? "Getting your location..." : "Finding your area..."}
          </>
        ) : (
          <>
            <LocateFixed className="w-4 h-4" />
            Use My GPS Location
          </>
        )}
      </motion.button>

      {status === "success" && place && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-farm-700">
          <MapPin className="w-3.5 h-3.5" />
          {place.district ? `${place.district}, ` : ""}
          {place.province || place.displayName}
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-1.5 mt-2 text-sm text-red-500">
          <AlertTriangle className="w-3.5 h-3.5" />
          {error}
        </div>
      )}
    </div>
  );
}
