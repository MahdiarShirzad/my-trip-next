"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getBookingById, type Booking } from "@/lib/services/apiBookings";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setIsLoading(false);
      return;
    }

    let ignore = false;
    async function load() {
      try {
        const data = await getBookingById(bookingId!);
        if (!ignore) setBooking(data);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#7167FF]" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          We couldn't find that booking.
        </p>
        <Link
          href="/user-panel/bookings"
          className="mt-4 inline-block text-sm font-semibold text-[#7167FF] hover:underline"
        >
          Go to My Bookings
        </Link>
      </div>
    );
  }

  const isFlight = booking.bookingType === "flight";

  const destinationCity = isFlight
    ? booking.flightId?.destination.city
    : booking.hotelId?.city;

  return (
    <div className="mx-auto max-w-xl px-6 py-20 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-8 w-8 text-emerald-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
        Booking Confirmed!
      </h1>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Your {isFlight ? "flight" : "hotel"} is booked and your payment was
        successful.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-left dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            Reference No.
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {booking.referenceNumber}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            Total Paid
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            ${booking.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Cross-sell */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-[#7167FF]/30 bg-[#7167FF]/5 p-6">
        <p className="font-bold text-slate-900 dark:text-white">
          {isFlight
            ? `Need a place to stay in ${destinationCity ?? "your destination"}?`
            : `Need a flight to ${destinationCity ?? "your destination"}?`}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isFlight
            ? "Complete your trip with a hotel booking."
            : "Complete your trip by booking your flight now."}
        </p>
        <Link
          href={isFlight ? "/hotels" : "/flights"}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#7167FF] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#5b51e6]"
        >
          {isFlight ? "Find Hotels" : "Find Flights"}
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 text-sm font-semibold">
        <Link
          href="/user-panel/bookings"
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          View My Bookings
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&middot;</span>
        <Link
          href="/"
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}
