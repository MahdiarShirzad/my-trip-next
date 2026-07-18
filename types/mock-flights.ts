import { Flight } from "@/types/flight";

function generateSeats(
  count: number,
  seatClass: "economy" | "business" | "first",
  basePrice: number,
) {
  return Array.from({ length: count }, (_, i) => ({
    seatNumber: `${seatClass[0].toUpperCase()}${i + 1}`,
    class: seatClass,
    price: basePrice,
    isBooked: Math.random() < 0.4, // random booked
  }));
}

export const mockFlights: Flight[] = [
  {
    _id: "f1",
    airline: "Emirates",
    flightNumber: "EK202",
    origin: { code: "DXB", city: "Dubai" },
    destination: { code: "LHR", city: "London" },
    departureTime: "2026-07-20T08:30:00Z",
    arrivalTime: "2026-07-20T12:30:00Z",
    seats: [
      ...generateSeats(10, "economy", 800),
      ...generateSeats(5, "business", 1400),
      ...generateSeats(2, "first", 2200),
    ],
    status: "scheduled",
    totalSeats: 17,
    availableSeats: 17,
  },

  {
    _id: "f2",
    airline: "Qatar Airways",
    flightNumber: "QR101",
    origin: { code: "DOH", city: "Doha" },
    destination: { code: "CDG", city: "Paris" },
    departureTime: "2026-07-20T14:00:00Z",
    arrivalTime: "2026-07-20T19:00:00Z",
    seats: [
      ...generateSeats(12, "economy", 900),
      ...generateSeats(6, "business", 1600),
    ],
    status: "boarding",
    totalSeats: 18,
    availableSeats: 12,
  },

  {
    _id: "f3",
    airline: "Lufthansa",
    flightNumber: "LH404",
    origin: { code: "FRA", city: "Frankfurt" },
    destination: { code: "JFK", city: "New York" },
    departureTime: "2026-07-20T10:00:00Z",
    arrivalTime: "2026-07-20T18:30:00Z",
    seats: [
      ...generateSeats(15, "economy", 1000),
      ...generateSeats(5, "business", 1800),
    ],
    status: "delayed",
    totalSeats: 20,
    availableSeats: 5,
  },

  {
    _id: "f4",
    airline: "Turkish Airlines",
    flightNumber: "TK789",
    origin: { code: "IST", city: "Istanbul" },
    destination: { code: "FCO", city: "Rome" },
    departureTime: "2026-07-20T06:00:00Z",
    arrivalTime: "2026-07-20T08:00:00Z",
    seats: generateSeats(20, "economy", 300),
    status: "scheduled",
    totalSeats: 20,
    availableSeats: 20,
  },

  {
    _id: "f5",
    airline: "British Airways",
    flightNumber: "BA256",
    origin: { code: "LHR", city: "London" },
    destination: { code: "BER", city: "Berlin" },
    departureTime: "2026-07-20T18:30:00Z",
    arrivalTime: "2026-07-20T20:00:00Z",
    seats: generateSeats(12, "economy", 220),
    status: "cancelled",
    totalSeats: 12,
    availableSeats: 0,
  },

  {
    _id: "f6",
    airline: "Air France",
    flightNumber: "AF990",
    origin: { code: "CDG", city: "Paris" },
    destination: { code: "HND", city: "Tokyo" },
    departureTime: "2026-07-21T09:00:00Z",
    arrivalTime: "2026-07-21T23:00:00Z",
    seats: [
      ...generateSeats(20, "economy", 1200),
      ...generateSeats(8, "business", 2000),
      ...generateSeats(3, "first", 3000),
    ],
    status: "scheduled",
    totalSeats: 31,
    availableSeats: 10,
  },
];
