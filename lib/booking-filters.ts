// lib/booking-filters.ts
// Pure, server-safe filtering for the bookings tabs.

import type { Booking } from "./mock-bookings";

function getRelevantDate(booking: Booking): string {
  return booking.type === "flight" ? booking.departureTime : booking.checkIn;
}

export function filterBookingsByTab(bookings: Booking[], tab: string): Booking[] {
  const now = Date.now();

  switch (tab) {
    case "upcoming":
      return bookings.filter(
        (b) =>
          new Date(getRelevantDate(b)).getTime() > now &&
          (b.status === "confirmed" || b.status === "pending")
      );
    case "past":
      return bookings.filter(
        (b) => new Date(getRelevantDate(b)).getTime() <= now && b.status !== "cancelled"
      );
    case "cancelled":
      return bookings.filter((b) => b.status === "cancelled");
    default:
      return bookings;
  }
}

export function sortBookingsByRecency(bookings: Booking[]): Booking[] {
  return [...bookings].sort(
    (a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
  );
}
