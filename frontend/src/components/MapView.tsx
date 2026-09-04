import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet's default marker icons don't resolve correctly under Vite's
// bundler by default — this re-registers them explicitly.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PAKISTAN_CENTER: [number, number] = [30.3753, 69.3451];

const AGRI_REGIONS: { name: string; province: string; lat: number; lon: number }[] = [
  { name: "Punjab Wheat Belt (Faisalabad)", province: "Punjab", lat: 31.418, lon: 73.079 },
  { name: "Sindh Rice Belt (Larkana)", province: "Sindh", lat: 27.559, lon: 68.212 },
  { name: "Multan Cotton/Mango Belt", province: "Punjab", lat: 30.1575, lon: 71.5249 },
  { name: "Peshawar Valley (Fruits/Veg)", province: "Khyber Pakhtunkhwa", lat: 34.0151, lon: 71.5249 },
  { name: "Quetta Fruit Orchards", province: "Balochistan", lat: 30.1798, lon: 66.975 },
  { name: "Sahiwal Dairy & Crop Belt", province: "Punjab", lat: 30.6682, lon: 73.1114 },
];

interface Props {
  pin?: { lat: number; lon: number; label: string } | null;
  className?: string;
}

export default function MapView({ pin, className = "h-80" }: Props) {
  const center: [number, number] = pin ? [pin.lat, pin.lon] : PAKISTAN_CENTER;
  const zoom = pin ? 9 : 5;

  return (
    <div className={`${className} rounded-2xl overflow-hidden shadow-card border border-farm-100`}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {AGRI_REGIONS.map((region) => (
          <CircleMarker
            key={region.name}
            center={[region.lat, region.lon]}
            radius={8}
            pathOptions={{ color: "#2e7d32", fillColor: "#66bb6a", fillOpacity: 0.7 }}
          >
            <Popup>
              <b>{region.name}</b>
              <br />
              {region.province}
            </Popup>
          </CircleMarker>
        ))}

        {pin && (
          <Marker position={[pin.lat, pin.lon]}>
            <Popup>{pin.label}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
