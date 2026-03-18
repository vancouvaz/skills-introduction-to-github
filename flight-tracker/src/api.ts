import type { Flight, OpenSkyResponse } from "./types";

const OPENSKY_BASE = "https://opensky-network.org/api";

function parseState(state: (string | number | boolean | null)[]): Flight {
  return {
    icao24: state[0] as string,
    callsign: state[1] ? (state[1] as string).trim() : null,
    origin_country: state[2] as string,
    time_position: state[3] as number | null,
    last_contact: state[4] as number,
    longitude: state[5] as number | null,
    latitude: state[6] as number | null,
    baro_altitude: state[7] as number | null,
    on_ground: state[8] as boolean,
    velocity: state[9] as number | null,
    true_track: state[10] as number | null,
    vertical_rate: state[11] as number | null,
    geo_altitude: state[13] as number | null,
    squawk: state[14] as string | null,
  };
}

export async function fetchFlights(bounds?: {
  lamin: number;
  lomin: number;
  lamax: number;
  lomax: number;
}): Promise<Flight[]> {
  let url = `${OPENSKY_BASE}/states/all`;
  if (bounds) {
    const params = new URLSearchParams({
      lamin: bounds.lamin.toString(),
      lomin: bounds.lomin.toString(),
      lamax: bounds.lamax.toString(),
      lomax: bounds.lomax.toString(),
    });
    url += `?${params}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenSky API error: ${res.status}`);
  const data: OpenSkyResponse = await res.json();
  if (!data.states) return [];

  return data.states
    .map(parseState)
    .filter((f) => f.latitude !== null && f.longitude !== null && !f.on_ground);
}

export function metersToFeet(m: number | null): string {
  if (m === null) return "N/A";
  return `${Math.round(m * 3.281).toLocaleString()} ft`;
}

export function msToKnots(ms: number | null): string {
  if (ms === null) return "N/A";
  return `${Math.round(ms * 1.944)} kts`;
}
