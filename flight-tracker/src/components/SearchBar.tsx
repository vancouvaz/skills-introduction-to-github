import { useState } from "react";
import type { Flight } from "../types";

interface Props {
  flights: Flight[];
  onSelect: (f: Flight) => void;
  loading: boolean;
  count: number;
}

export default function SearchBar({ flights, onSelect, loading, count }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = query.length > 1
    ? flights.filter(
        (f) =>
          f.callsign?.toLowerCase().includes(query.toLowerCase()) ||
          f.icao24.toLowerCase().includes(query.toLowerCase()) ||
          f.origin_country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="searchbar">
      <div className="search-input-wrap">
        <span className="search-icon">✈</span>
        <input
          type="text"
          placeholder="Search callsign, ICAO, country..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="search-input"
        />
        <span className="flight-count">
          {loading ? "Loading..." : `${count.toLocaleString()} flights`}
        </span>
      </div>
      {open && results.length > 0 && (
        <ul className="search-results">
          {results.map((f) => (
            <li key={f.icao24} onMouseDown={() => { onSelect(f); setQuery(""); setOpen(false); }}>
              <span className="res-callsign">{f.callsign ?? f.icao24}</span>
              <span className="res-country">{f.origin_country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
