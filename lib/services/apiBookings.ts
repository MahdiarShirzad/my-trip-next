import { apiRequest } from "../utils/apiClient";
import type { Booking } from "@/lib/mock-bookings";

export type { Booking, FlightBooking, HotelBooking } from "@/lib/mock-bookings";

interface BookingsResponse {
  status: string;
  results?: number;
  data: {
    bookings: Booking[];
  };
}

export async function getMyBookings(): Promise<Booking[]> {
  const res = await apiRequest<BookingsResponse>("/bookings/my-bookings");
  return res?.data?.bookings ?? [];
}
