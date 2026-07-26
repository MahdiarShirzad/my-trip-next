"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMyBookings, type Booking } from "@/lib/services/apiBookings";
import {
  filterBookingsByTab,
  sortBookingsByRecency,
} from "../../../lib/booking-filters";
import BookingTabs from "../_components/BookingTabs";
import BookingCard from "../_components/BookingCard";

export default function BookingsPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";

  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMyBookings();
        if (!ignore) setAllBookings(data);
      } catch {
        if (!ignore) setError("error fetching reservations");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

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

      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#7167FF]" />
        </div>
      ) : error ? (
        <p className="text-center text-sm text-red-500">{error}</p>
      ) : bookings.length > 0 ? (
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
