import { Booking } from "@/lib/mock-bookings";
import StatusBadge from "./StatusBadge";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const CANCELLABLE_STATUSES = new Set(["confirmed", "pending"]);

export default function BookingCard({ booking }: { booking: Booking }) {
  const canCancel = CANCELLABLE_STATUSES.has(booking.status);

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-[#7167FF]/40 dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Type + route/hotel info */}
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              booking.type === "flight"
                ? "bg-[#7167FF]/10 text-[#7167FF]"
                : "bg-sky-500/10 text-sky-500"
            }`}
          >
            {booking.type === "flight" ? (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-5 w-5 rotate-90 fill-current"
              >
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            ) : (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21h18M5 21V7l8-4v18M13 21V11l6 4v6M9 9h.01M9 13h.01M9 17h.01"
                />
              </svg>
            )}
          </div>

          <div className="min-w-0">
            {booking.type === "flight" ? (
              <>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {booking.origin}{" "}
                  <span className="text-slate-400">&rarr;</span>{" "}
                  {booking.destination}
                </p>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {booking.airline} &middot; {booking.flightNumber}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-400 dark:text-slate-500">
                  Departs {formatDateTime(booking.departureTime)}
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {booking.hotelName}
                </p>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {booking.city} &middot; {booking.roomType}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-400 dark:text-slate-500">
                  {formatDate(booking.checkIn)} &ndash;{" "}
                  {formatDate(booking.checkOut)}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Status + price + actions */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-dashed border-slate-200 pt-4 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:border-slate-200 sm:pl-6 sm:pt-0 dark:border-slate-800">
          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <StatusBadge status={booking.status} />
            <p className="font-mono text-lg font-bold text-slate-900 dark:text-white">
              ${booking.price.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/user-panel/bookings/${booking._id}`}
              className="rounded-full border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Details
            </a>
            {canCancel && (
              <button className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
