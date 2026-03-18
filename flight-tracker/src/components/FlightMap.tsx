import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Flight } from "../types";

// Fix Leaflet default icon issue with Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function createPlaneIcon(heading: number | null, selected: boolean) {
  const rotation = heading ?? 0;
  const color = selected ? "#f59e0b" : "#3b82f6";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
      style="transform: rotate(${rotation}deg); filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5))">
      <path fill="${color}" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function BoundsWatcher({ onBoundsChange }: { onBoundsChange: (b: L.LatLngBounds) => void }) {
  const map = useMap();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onBoundsChange(map.getBounds()), 500);
    };
    map.on("moveend zoomend", handler);
    onBoundsChange(map.getBounds());
    return () => { map.off("moveend zoomend", handler); };
  }, [map, onBoundsChange]);

  return null;
}

interface Props {
  flights: Flight[];
  selected: Flight | null;
  onSelect: (f: Flight) => void;
  onBoundsChange: (b: L.LatLngBounds) => void;
}

export default function FlightMap({ flights, selected, onSelect, onBoundsChange }: Props) {
  return (
    <MapContainer
      center={[30, 0]}
      zoom={4}
      style={{ height: "100%", width: "100%", background: "#0f172a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <BoundsWatcher onBoundsChange={onBoundsChange} />
      {flights.map((flight) => (
        <Marker
          key={flight.icao24}
          position={[flight.latitude!, flight.longitude!]}
          icon={createPlaneIcon(flight.true_track, selected?.icao24 === flight.icao24)}
          eventHandlers={{ click: () => onSelect(flight) }}
        >
          <Popup>
            <strong>{flight.callsign ?? flight.icao24}</strong>
            <br />
            {flight.origin_country}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
