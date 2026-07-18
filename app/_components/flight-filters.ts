// lib/flight-filters.ts
// Pure, server-safe helpers. No "use client" needed — this runs during
// the page's server render, driven entirely by the URL searchParams.

export interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO string
  arrivalTime: string; // ISO string
  duration: number; // minutes
  price: number;
  class: string;
  seatsAvailable: number;
}

export type FlightSearchParams = {
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  departure?: string | string[]; // "morning" | "afternoon" | "evening" | "night"
  airline?: string | string[];
};

const DEPARTURE_WINDOWS: Record<string, [number, number]> = {
  morning: [6, 12],
  afternoon: [12, 18],
  evening: [18, 24],
  night: [0, 6],
};

function toArray(value?: string | string[]): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function getAirlineOptions(flights: Flight[]): string[] {
  return Array.from(new Set(flights.map((f) => f.airline))).sort();
}

export function getPriceBounds(flights: Flight[]): {
  min: number;
  max: number;
} {
  if (flights.length === 0) return { min: 0, max: 0 };
  const prices = flights.map((f) => f.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function filterFlights(
  flights: Flight[],
  params: FlightSearchParams,
): Flight[] {
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const departureWindows = toArray(params.departure);
  const airlines = toArray(params.airline);

  return flights.filter((flight) => {
    if (minPrice !== undefined && flight.price < minPrice) return false;
    if (maxPrice !== undefined && flight.price > maxPrice) return false;

    if (airlines.length > 0 && !airlines.includes(flight.airline)) return false;

    if (departureWindows.length > 0) {
      const hour = new Date(flight.departureTime).getHours();
      const matchesWindow = departureWindows.some((key) => {
        const window = DEPARTURE_WINDOWS[key];
        if (!window) return false;
        const [start, end] = window;
        // "night" wraps 0-6, all others are simple ranges
        return hour >= start && hour < end;
      });
      if (!matchesWindow) return false;
    }

    return true;
  });
}

export function sortFlights(flights: Flight[], sort?: string): Flight[] {
  const list = [...flights];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "departure-earliest":
      return list.sort(
        (a, b) =>
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime(),
      );
    case "departure-latest":
      return list.sort(
        (a, b) =>
          new Date(b.departureTime).getTime() -
          new Date(a.departureTime).getTime(),
      );
    default:
      return list;
  }
}
