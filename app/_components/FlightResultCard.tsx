import { Flight } from "./flight-filters";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h}h ${m > 0 ? `${m}m` : ""}`.trim();
}

interface FlightResultCardProps {
  flight: Flight;
}

export default function FlightResultCard({ flight }: FlightResultCardProps) {
  const seatsLow = flight.seatsAvailable > 0 && flight.seatsAvailable <= 5;

  const soldOut = flight.seatsAvailable === 0;

  return (
    <article className="group relative flex flex-col transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 sm:flex-row">
      <div
        aria-hidden
        className="absolute left-[240px] top-0 hidden h-full w-px border-l-2 border-dashed border-slate-200 dark:border-slate-800 sm:block"
      />

      <div
        aria-hidden
        className="absolute left-[234px] top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full bg-white dark:bg-slate-900 sm:block"
      />

      {/* Airline */}
      <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-b border-slate-100 p-6 sm:w-[240px] sm:flex-col sm:items-start sm:justify-center sm:border-b-0 dark:border-slate-800">
        <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#7167FF]/10 text-sm font-extrabold text-[#7167FF] sm:mb-3">
            {flight.airline.slice(0, 2).toUpperCase()}
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Airline
            </p>

            <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
              {flight.airline}
            </p>
          </div>
        </div>

        <div className="text-right sm:mt-4 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Flight
          </p>

          <p className="mt-0.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {flight.flightNumber}
          </p>
        </div>
      </div>

      {/* Route */}
      <div className="flex flex-1 flex-col justify-center gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:pl-10">
        <div className="flex flex-1 items-center gap-6">
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formatTime(flight.departureTime)}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {flight.origin}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center px-2">
            <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {formatDuration(flight.duration)}
            </p>

            <div className="relative flex w-full items-center">
              <span className="h-2 w-2 shrink-0 rounded-full border-2 border-[#7167FF]/40 bg-white dark:bg-slate-900" />

              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="mx-2 h-6 w-6 shrink-0 rotate-90 text-[#7167FF]"
                fill="currentColor"
              >
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>

              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

              <span className="h-2 w-2 shrink-0 rounded-full border-2 border-[#7167FF]/40 bg-white dark:bg-slate-900" />
            </div>

            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {flight.class}
            </p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formatTime(flight.arrivalTime)}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {flight.destination}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:border-dashed sm:border-slate-200 sm:pl-8 sm:pt-0 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <p className="text-2xl font-extrabold text-[#7167FF]">
              ${flight.price.toLocaleString()}
            </p>

            {soldOut ? (
              <p className="mt-1 inline-flex rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
                Sold out
              </p>
            ) : seatsLow ? (
              <p className="mt-1 inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                {flight.seatsAvailable} seats left
              </p>
            ) : (
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Seats available
              </p>
            )}
          </div>

          <a
            href={soldOut ? undefined : `/flights/${flight._id}/booking`}
            aria-disabled={soldOut}
            className={`group/btn flex shrink-0 items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-200 ${
              soldOut
                ? "pointer-events-none bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                : "bg-[#7167FF] text-white shadow-md shadow-[#7167FF]/20 hover:bg-[#5b50f0] hover:shadow-lg hover:shadow-[#7167FF]/35"
            }`}
          >
            {soldOut ? "Unavailable" : "Select Flight"}

            {!soldOut && (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </a>
        </div>
      </div>
    </article>
  );
}
