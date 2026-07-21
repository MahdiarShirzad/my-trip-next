// lib/mock-flights.ts
//
// Temporary mock data source — swap `getFlights()` in
// app/(marketing)/flights/page.tsx to call your real API and delete this
// import once the backend is wired up. Shape matches lib/flight-filters.ts's
// `Flight` interface; adjust field names there first if your real Flight
// Mongoose model differs.

import type { Flight } from "./flight-filters";

const AIRLINES = [
  "Iran Air",
  "Mahan Air",
  "Qatar Airways",
  "Turkish Airlines",
  "Emirates",
  "Aseman Airlines",
];

const ROUTES: { origin: string; destination: string; duration: number }[] = [
  { origin: "Tehran (IKA)", destination: "Istanbul (IST)", duration: 195 },
  { origin: "Tehran (IKA)", destination: "Dubai (DXB)", duration: 105 },
  { origin: "Mashhad (MHD)", destination: "Tehran (IKA)", duration: 80 },
  { origin: "Shiraz (SYZ)", destination: "Tehran (IKA)", duration: 75 },
  { origin: "Tehran (IKA)", destination: "Doha (DOH)", duration: 130 },
  { origin: "Isfahan (IFN)", destination: "Tehran (IKA)", duration: 65 },
  { origin: "Tehran (IKA)", destination: "Frankfurt (FRA)", duration: 385 },
  { origin: "Tabriz (TBZ)", destination: "Tehran (IKA)", duration: 70 },
  { origin: "Tehran (IKA)", destination: "Kuala Lumpur (KUL)", duration: 460 },
  { origin: "Kish (KIH)", destination: "Tehran (IKA)", duration: 95 },
  { origin: "Tehran (IKA)", destination: "London (LHR)", duration: 410 },
  { origin: "Ahvaz (AWZ)", destination: "Tehran (IKA)", duration: 70 },
];

const CLASSES = ["Economy", "Business", "First Class"];

// Deterministic pseudo-random so mock output is stable across re-renders/builds
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function buildMockFlights(count: number): Flight[] {
  const rand = seededRandom(42);
  const flights: Flight[] = [];

  for (let i = 0; i < count; i++) {
    const route = ROUTES[i % ROUTES.length];
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)];
    const flightClass = CLASSES[Math.floor(rand() * CLASSES.length)];

    // Spread departures across the next 14 days, at varied hours
    const dayOffset = Math.floor(rand() * 14);
    const hour = Math.floor(rand() * 24);
    const minute = Math.floor(rand() * 4) * 15;

    const departureTime = new Date();
    departureTime.setDate(departureTime.getDate() + dayOffset);
    departureTime.setHours(hour, minute, 0, 0);

    const arrivalTime = new Date(departureTime.getTime() + route.duration * 60_000);

    const basePrice = 80 + Math.floor(rand() * 920); // $80–$1000
    const classMultiplier =
      flightClass === "First Class" ? 2.6 : flightClass === "Business" ? 1.7 : 1;
    const price = Math.round((basePrice * classMultiplier) / 5) * 5;

    const seatsAvailable = Math.floor(rand() * 40); // some will be 0 (sold out) or low

    flights.push({
      _id: `mock-flight-${i + 1}`,
      airline,
      flightNumber: `${airline.slice(0, 2).toUpperCase()}${100 + Math.floor(rand() * 899)}`,
      origin: route.origin,
      destination: route.destination,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      duration: route.duration,
      price,
      class: flightClass,
      seatsAvailable,
    });
  }

  return flights;
}

export const mockFlights: Flight[] = buildMockFlights(28);

export async function getMockFlights(): Promise<Flight[]> {
  return mockFlights;
}
