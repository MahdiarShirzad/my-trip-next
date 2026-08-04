import {
  buildBackendFlightQuery,
  getAllFlights,
} from "@/lib/services/apiFlights";
import FlightResultsHeader from "./FlightResultsHeader";
import { adaptFlights } from "@/lib/flight-adapter";
import {
  filterFlights,
  FlightSearchParams,
  sortFlights,
} from "@/app/_components/flight-filters";
import FlightResultCard from "./FlightResultCard";
import FlightSort from "./FlightSort";

function isFlightExpired(departureTime: string) {
  return new Date(departureTime).getTime() < Date.now();
}

function pushExpiredToEnd<T extends { departureTime: string }>(flights: T[]) {
  const active: T[] = [];
  const expired: T[] = [];

  for (const flight of flights) {
    (isFlightExpired(flight.departureTime) ? expired : active).push(flight);
  }

  return [...active, ...expired];
}

export default async function FlightResultsSection({
  searchParams,
}: {
  searchParams: Promise<FlightSearchParams>;
}) {
  const params = await searchParams;

  const backendQuery = buildBackendFlightQuery(
    params as Record<string, string | string[] | undefined>,
  );
  const res = await getAllFlights(backendQuery);
  const data = res?.data?.flights ?? [];

  const allFlights = adaptFlights(data);
  const filtered = filterFlights(allFlights, params);
  const sorted = sortFlights(filtered, params.sort);
  const results = pushExpiredToEnd(sorted);

  return (
    <>
      <FlightResultsHeader count={results.length} sortSlot={<FlightSort />} />

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7167FF]/10">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-10 w-10 text-[#7167FF]"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            No flights match your filters
          </p>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Try widening your price range or clearing a filter.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {results.map((flight) => (
            <FlightResultCard key={flight._id} flight={flight} />
          ))}
        </div>
      )}
    </>
  );
}
