// lib/mock-bookings.ts
// Temporary mock data — matches the Booking model shape you described
// (flight/hotel bookings, pending/paid/cancelled/expired status).
// Swap getMockBookings() for a real getMyBookings() API call later.

export interface FlightBooking {
  _id: string;
  type: "flight";
  status: "confirmed" | "pending" | "cancelled" | "expired";
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  bookedAt: string;
}

export interface HotelBooking {
  _id: string;
  type: "hotel";
  status: "confirmed" | "pending" | "cancelled" | "expired";
  hotelName: string;
  city: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  price: number;
  bookedAt: string;
}

export type Booking = FlightBooking | HotelBooking;

const now = Date.now();
const day = 86_400_000;

export const mockBookings: Booking[] = [
  {
    _id: "bk-1",
    type: "flight",
    status: "confirmed",
    airline: "Turkish Airlines",
    flightNumber: "TK876",
    origin: "Tehran (IKA)",
    destination: "Istanbul (IST)",
    departureTime: new Date(now + 5 * day).toISOString(),
    arrivalTime: new Date(now + 5 * day + 195 * 60_000).toISOString(),
    price: 340,
    bookedAt: new Date(now - 2 * day).toISOString(),
  },
  {
    _id: "bk-2",
    type: "hotel",
    status: "confirmed",
    hotelName: "Grand Bosphorus Hotel",
    city: "Istanbul, Turkey",
    roomType: "Double Room",
    checkIn: new Date(now + 5 * day).toISOString(),
    checkOut: new Date(now + 9 * day).toISOString(),
    price: 620,
    bookedAt: new Date(now - 2 * day).toISOString(),
  },
  {
    _id: "bk-3",
    type: "flight",
    status: "pending",
    airline: "Qatar Airways",
    flightNumber: "QR205",
    origin: "Tehran (IKA)",
    destination: "Doha (DOH)",
    departureTime: new Date(now + 12 * day).toISOString(),
    arrivalTime: new Date(now + 12 * day + 130 * 60_000).toISOString(),
    price: 410,
    bookedAt: new Date(now - 1 * 3_600_000).toISOString(),
  },
  {
    _id: "bk-4",
    type: "flight",
    status: "cancelled",
    airline: "Mahan Air",
    flightNumber: "W5123",
    origin: "Shiraz (SYZ)",
    destination: "Tehran (IKA)",
    departureTime: new Date(now - 10 * day).toISOString(),
    arrivalTime: new Date(now - 10 * day + 75 * 60_000).toISOString(),
    price: 95,
    bookedAt: new Date(now - 15 * day).toISOString(),
  },
  {
    _id: "bk-5",
    type: "hotel",
    status: "confirmed",
    hotelName: "Palm Jumeirah Resort",
    city: "Dubai, UAE",
    roomType: "Suite",
    checkIn: new Date(now - 30 * day).toISOString(),
    checkOut: new Date(now - 25 * day).toISOString(),
    price: 1450,
    bookedAt: new Date(now - 40 * day).toISOString(),
  },
  {
    _id: "bk-6",
    type: "flight",
    status: "expired",
    airline: "Iran Air",
    flightNumber: "IR655",
    origin: "Tehran (IKA)",
    destination: "Frankfurt (FRA)",
    departureTime: new Date(now - 1 * 3_600_000).toISOString(),
    arrivalTime: new Date(now - 1 * 3_600_000 + 385 * 60_000).toISOString(),
    price: 780,
    bookedAt: new Date(now - 20 * 60_000).toISOString(),
  },
];

export async function getMockBookings(): Promise<Booking[]> {
  return mockBookings;
}
