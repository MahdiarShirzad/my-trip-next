import airportsData from "../../data/airports.json";

export interface Airport {
  city: string;
  code: string;
  country: string;
}

export const AIRPORTS: Airport[] = airportsData as Airport[];

export function findAirportByCity(cityQuery: string) {
  const q = cityQuery.trim().toLowerCase();
  if (!q) return null;
  return (
    AIRPORTS.find((a) => a.city.toLowerCase() === q) ||
    AIRPORTS.find((a) => a.city.toLowerCase().startsWith(q)) ||
    null
  );
}

const MAX_SUGGESTIONS = 8;

export function searchAirports(query: string): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return AIRPORTS.slice(0, MAX_SUGGESTIONS);

  const matches: Airport[] = [];

  for (const airport of AIRPORTS) {
    if (matches.length >= MAX_SUGGESTIONS) break;
    if (airport.city.toLowerCase().startsWith(q)) {
      matches.push(airport);
    }
  }

  if (matches.length < MAX_SUGGESTIONS) {
    for (const airport of AIRPORTS) {
      if (matches.length >= MAX_SUGGESTIONS) break;
      if (
        !airport.city.toLowerCase().startsWith(q) &&
        airport.city.toLowerCase().includes(q)
      ) {
        matches.push(airport);
      }
    }
  }

  return matches;
}
