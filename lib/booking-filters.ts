import type { Booking } from "@/lib/services/apiBookings";

function getRelevantDate(booking: Booking): string | undefined {
  return booking.bookingType === "flight"
    ? booking.travelDate
    : booking.checkInDate;
}

export function filterBookingsByTab(
  bookings: Booking[],
  tab: string,
): Booking[] {
  const now = Date.now();

  switch (tab) {
    case "upcoming":
      return bookings.filter((b) => {
        const date = getRelevantDate(b);
        return (
          date &&
          new Date(date).getTime() > now &&
          (b.status === "confirmed" || b.status === "pending")
        );
      });
    case "past":
      return bookings.filter((b) => {
        const date = getRelevantDate(b);
        return (
          date && new Date(date).getTime() <= now && b.status !== "cancelled"
        );
      });
    case "cancelled":
      return bookings.filter((b) => b.status === "cancelled");
    default:
      return bookings;
  }
}

export function sortBookingsByRecency(bookings: Booking[]): Booking[] {
  return [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
