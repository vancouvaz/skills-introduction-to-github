import { useState, useCallback, useEffect, useRef } from "react";
import L from "leaflet";
import FlightMap from "./components/FlightMap";
import FlightPanel from "./components/FlightPanel";
import SearchBar from "./components/SearchBar";
import { fetchFlights } from "./api";
import type { Flight } from "./types";
import "./App.css";

const REFRESH_INTERVAL = 15000; // 15s — OpenSky rate limit is friendly at this pace

export default function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selected, setSelected] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const boundsRef = useRef<L.LatLngBounds | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const bounds = boundsRef.current;
      const data = await fetchFlights(
        bounds
          ? {
              lamin: bounds.getSouth(),
              lomin: bounds.getWest(),
              lamax: bounds.getNorth(),
              lomax: bounds.getEast(),
            }
          : undefined
      );
      setFlights(data);
      setLastUpdate(new Date());
    } catch {
      setError("Could not reach OpenSky Network. Try again shortly.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBoundsChange = useCallback(
    (b: L.LatLngBounds) => {
      boundsRef.current = b;
      setLoading(true);
      load();
    },
    [load]
  );

  // Auto-refresh
  useEffect(() => {
    const id = setInterval(load, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [load]);

  // Update selected flight with fresh data on each refresh
  useEffect(() => {
    if (selected) {
      const fresh = flights.find((f) => f.icao24 === selected.icao24);
      if (fresh) setSelected(fresh);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flights]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">
          <span className="logo-icon">✈</span>
          <span className="logo-text">FreeFlight</span>
        </div>
        <SearchBar
          flights={flights}
          onSelect={setSelected}
          loading={loading}
          count={flights.length}
        />
        <div className="status">
          {error ? (
            <span className="error-badge">{error}</span>
          ) : lastUpdate ? (
            <span className="update-time">Updated {lastUpdate.toLocaleTimeString()}</span>
          ) : null}
          <button className="refresh-btn" onClick={load} disabled={loading}>
            ↻
          </button>
        </div>
      </header>

      <main className="map-container">
        <FlightMap
          flights={flights}
          selected={selected}
          onSelect={setSelected}
          onBoundsChange={handleBoundsChange}
        />
        <FlightPanel flight={selected} onClose={() => setSelected(null)} />
      </main>
    </div>
  );
}
