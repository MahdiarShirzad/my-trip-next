// types/flight-booking.ts
// Mirrors the backend Mongoose Flight/Seat schema 1:1.

export type SeatClass = "economy" | "business" | "first";

export interface Seat {
  seatNumber: string;
  class: SeatClass;
  price: number;
  isBooked: boolean;
}

export interface FlightLocation {
  code: string;
  city: string;
}

export type FlightStatus = "scheduled" | "delayed" | "cancelled" | "boarding";
export interface FlightDetail {
  _id: string;
  airline: string;
  flightNumber: string;
  origin: FlightLocation;
  destination: FlightLocation;
  departureTime: string; // ISO date string over the wire
  arrivalTime: string;
  duration?: number; // minutes
  seats: Seat[];
  totalSeats: number;
  availableSeats: number;
  status: FlightStatus;
}
