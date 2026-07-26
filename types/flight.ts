export type SeatClass = "first" | "business" | "economy";

export type FlightStatus =
  | "scheduled"
  | "delayed"
  | "boarding"
  | "departed"
  | "cancelled"
  | "completed";

export interface Airport {
  code: string;
  city: string;
}

export interface Seat {
  seatNumber: string;
  class: SeatClass;
  price: number;
  isBooked: boolean;
}

export interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string; // ISO date string
  arrivalTime: string; // ISO date string
  seats: Seat[];
  status: FlightStatus;
  totalSeats: number;
  availableSeats: number;
  createdAt?: string;
  updatedAt?: string;
}
