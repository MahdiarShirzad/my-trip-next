// lib/services/apiBookings.ts
import { apiRequest } from "../utils/apiClient";

export interface PopulatedFlight {
  _id: string;
  airline: string;
  flightNumber: string;
  origin: { city: string; code?: string };
  destination: { city: string; code?: string };
  departureTime: string;
  arrivalTime: string;
}

export interface PopulatedHotel {
  _id: string;
  name: string;
  city: string;
}

export interface Passenger {
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  seatNumber?: string;
}

export interface Booking {
  _id: string;
  bookingType: "flight" | "hotel";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalPrice: number;
  referenceNumber: string;
  createdAt: string;

  flightId?: PopulatedFlight;
  hotelId?: PopulatedHotel;
  passengers?: Passenger[];

  travelDate?: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomType?: string;
  roomNumbers?: string[];
}

interface BookingsResponse {
  status: string;
  results?: number;
  data: { bookings: Booking[] };
}

export async function getMyBookings(): Promise<Booking[]> {
  const res = await apiRequest<BookingsResponse>("/bookings/my-bookings");
  return res?.data?.bookings ?? [];
}

export interface CreateFlightBookingInput {
  flightId: string;
  travelDate: string;
  passengers: {
    name: string;
    email: string;
    phone: string;
    nationalId: string;
    seatNumber: string;
  }[];
}

interface CreateBookingResponse {
  status: string;
  data: { booking: Booking };
}

export async function createFlightBooking(input: CreateFlightBookingInput) {
  return apiRequest<CreateBookingResponse>("/bookings/flights", {
    method: "POST",
    body: input,
  });
}
