import { getMockBookings } from "@/lib/mock-bookings";
import {
  filterBookingsByTab,
  sortBookingsByRecency,
} from "../../../lib/booking-filters";
import BookingTabs from "../_components/BookingTabs";
import BookingCard from "../_components/BookingCard";

interface BookingsPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function BookingsPage({
  searchParams,
}: BookingsPageProps) {
  const { tab = "all" } = await searchParams;
  const allBookings = await getMockBookings();

  const filtered = filterBookingsByTab(allBookings, tab);
  const bookings = sortBookingsByRecency(filtered);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          My Bookings
        </h1>
        <BookingTabs />
      </div>

      {bookings.length > 0 ? (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-24 text-center dark:border-slate-800">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="mb-4 h-10 w-10 text-slate-300 dark:text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
            />
          </svg>
          <p className="font-semibold text-slate-500 dark:text-slate-400">
            No bookings in this category
          </p>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-600">
            Your flight and hotel bookings will show up here.
          </p>
        </div>
      )}
    </div>
  );
}
