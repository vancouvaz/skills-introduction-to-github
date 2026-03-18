import type { Flight } from "../types";
import { metersToFeet, msToKnots } from "../api";

interface Props {
  flight: Flight | null;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}

export default function FlightPanel({ flight, onClose }: Props) {
  if (!flight) return null;

  const lastSeen = flight.last_contact
    ? new Date(flight.last_contact * 1000).toLocaleTimeString()
    : "N/A";

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="callsign">{flight.callsign ?? flight.icao24}</div>
          <div className="country">{flight.origin_country}</div>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="panel-body">
        <Row label="ICAO24" value={flight.icao24.toUpperCase()} />
        <Row label="Altitude" value={metersToFeet(flight.baro_altitude)} />
        <Row label="Speed" value={msToKnots(flight.velocity)} />
        <Row label="Heading" value={flight.true_track !== null ? `${Math.round(flight.true_track)}°` : "N/A"} />
        <Row label="Vertical rate" value={
          flight.vertical_rate !== null
            ? `${flight.vertical_rate > 0 ? "↑" : "↓"} ${Math.abs(Math.round(flight.vertical_rate * 196.85))} fpm`
            : "N/A"
        } />
        <Row label="Squawk" value={flight.squawk ?? "N/A"} />
        <Row label="Last seen" value={lastSeen} />
        <Row label="Position" value={
          `${flight.latitude?.toFixed(3)}°, ${flight.longitude?.toFixed(3)}°`
        } />
      </div>
      <div className="panel-footer">
        <a
          href={`https://www.flightradar24.com/${flight.callsign ?? flight.icao24}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ext-link"
        >
          View on FlightRadar24 →
        </a>
      </div>
    </div>
  );
}
