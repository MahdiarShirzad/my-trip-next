import Link from "next/link";
import {
  formatFlightDate,
  formatFlightTime,
  getAirlineAvatar,
  getFlightDuration,
  getSeatsLeftLabel,
  getStartingPrice,
  STATUS_STYLES,
} from "@/lib/flight-utils";
import { Flight } from "@/types/flight";

export default function FlightCard({ flight }: { flight: Flight }) {
  const { initials, gradient } = getAirlineAvatar(flight.airline);
  const status = STATUS_STYLES[flight.status] ?? STATUS_STYLES.scheduled;
  const startingPrice = getStartingPrice(flight);
  const seatsLeftLabel = getSeatsLeftLabel(flight);
  const isSoldOut = flight.availableSeats === 0;
  const isLowAvailability = !isSoldOut && flight.availableSeats <= 3;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:border-slate-700/60 dark:bg-slate-800 dark:shadow-none dark:hover:shadow-black/30">
      {/* airline + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-interBold text-sm text-white`}
          >
            {initials}
          </div>
          <div>
            <p className="font-interSemiBold text-sm leading-tight text-slate-800 dark:text-slate-100">
              {flight.airline}
            </p>
            <p className="font-inter text-xs text-slate-400">
              {flight.flightNumber}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 font-interSemiBold text-[11px] ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* route */}
      <div className="mt-6 flex items-center justify-between gap-2">
        <div>
          <p className="font-interBold text-2xl text-slate-800 dark:text-white">
            {flight.origin.code}
          </p>
          <p className="font-inter text-xs text-slate-400">
            {flight.origin.city}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center px-2">
          <span className="font-inter text-[11px] text-slate-400">
            {getFlightDuration(flight.departureTime, flight.arrivalTime)}
          </span>
          <div className="my-1.5 flex w-full items-center">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7167FF]" />
            <span className="mx-1 h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-600" />
            <svg
              aria-hidden="true"
              className="w-4 shrink-0 rotate-90 text-[#7167FF]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 16.5v-2l-8.5-5V4a1.5 1.5 0 0 0-3 0v5.5L2 14.5v2l8.5-2.6V19l-2.5 1.8V22l3.5-1 3.5 1v-1.2L12.5 19v-5.1l8.5 2.6Z" />
            </svg>
            <span className="mx-1 h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-600" />
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f96768]" />
          </div>
          <span className="font-inter text-[11px] text-slate-400">Direct</span>
        </div>

        <div className="text-right">
          <p className="font-interBold text-2xl text-slate-800 dark:text-white">
            {flight.destination.code}
          </p>
          <p className="font-inter text-xs text-slate-400">
            {flight.destination.city}
          </p>
        </div>
      </div>

      {/* departure / arrival */}
      <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-700/40">
        <div>
          <p className="font-interSemiBold text-sm text-slate-700 dark:text-slate-200">
            {formatFlightTime(flight.departureTime)}
          </p>
          <p className="font-inter text-[11px] text-slate-400">
            {formatFlightDate(flight.departureTime)}
          </p>
        </div>
        <svg
          aria-hidden="true"
          className="w-4 text-slate-300 dark:text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-right">
          <p className="font-interSemiBold text-sm text-slate-700 dark:text-slate-200">
            {formatFlightTime(flight.arrivalTime)}
          </p>
          <p className="font-inter text-[11px] text-slate-400">
            {formatFlightDate(flight.arrivalTime)}
          </p>
        </div>
      </div>

      {/* price + seats */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/60">
        <div>
          <p className="font-inter text-[11px] text-slate-400">From</p>
          <p className="font-interBold text-lg text-[#f96768]">
            ${startingPrice}
          </p>
        </div>
        <p
          className={`font-interSemiBold text-xs ${
            isSoldOut
              ? "text-slate-400 dark:text-slate-500"
              : isLowAvailability
                ? "text-amber-500"
                : "text-emerald-500"
          }`}
        >
          {seatsLeftLabel}
        </p>
      </div>

      <Link
        href={`/flights/${flight._id}/booking`}
        aria-disabled={isSoldOut}
        className={`mt-4 flex items-center justify-center gap-1.5 rounded-xl py-2.5 font-interSemiBold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${
          isSoldOut
            ? "pointer-events-none bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            : "bg-[#7167FF] text-white hover:bg-[#5b52e0]"
        }`}
      >
        {isSoldOut ? "Sold out" : "See details"}
        {!isSoldOut && (
          <svg
            aria-hidden="true"
            className="w-3.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>
    </div>
  );
}
