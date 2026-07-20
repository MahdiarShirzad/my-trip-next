import {
  filterFlights,
  FlightSearchParams,
  getAirlineOptions,
  getPriceBounds,
  sortFlights,
} from "@/app/_components/flight-filters";
import FlightFilters from "@/app/(marketing)/flights/[id]/_components/FlightFilters";
import FlightHero from "@/app/(marketing)/flights/[id]/_components/FlightHero";
import FlightResultCard from "@/app/(marketing)/flights/[id]/_components/FlightResultCard";
import FlightResultsHeader from "@/app/(marketing)/flights/[id]/_components/FlightResultsHeader";
import FlightSearch from "@/app/(marketing)/flights/[id]/_components/FlightSearch";
import FlightSort from "@/app/(marketing)/flights/[id]/_components/FlightSort";
import { adaptFlights } from "@/lib/flight-adapter";
import { Flight } from "@/types/flight";
import { mockFlights } from "@/types/mock-flights";

async function getFlights(): Promise<Flight[]> {
  const res = await fetch(`${process.env.API_URL}/flights`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to load flights");
  const json = await res.json();
  return json.data as Flight[];
}

interface FlightsPageProps {
  searchParams: Promise<FlightSearchParams>;
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  const params = await searchParams;
  const allFlights = adaptFlights(mockFlights);

  const airlineOptions = getAirlineOptions(allFlights);
  const priceBounds = getPriceBounds(allFlights);

  const filtered = filterFlights(allFlights, params);
  const results = sortFlights(filtered, params.sort);

  return (
    <main className="min-h-screen pb-24 transition-colors duration-300">
      <FlightHero />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 -mt-24 sm:-mt-32 lg:-mt-36">
        <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
          <FlightSearch />
          <div className="flex items-center justify-center mt-6">
            <button className="bg-[#7167FF] hover:bg-[#5b51e6] text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-[#7167FF]/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm tracking-wide">
              Search Available Options
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <aside className="w-full lg:sticky lg:top-24 lg:w-[300px] lg:shrink-0 xl:w-[320px]">
            <FlightFilters
              airlineOptions={airlineOptions}
              priceBounds={priceBounds}
            />
          </aside>

          <section className="min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <FlightResultsHeader
              count={results.length}
              sortSlot={<FlightSort />}
            />

            {results.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.map((flight) => (
                  <FlightResultCard key={flight._id} flight={flight} />
                ))}
              </div>
            ) : (
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
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
