import { Suspense } from "react";
import { Metadata } from "next";
import {
  FlightSearchParams,
  getAirlineOptions,
  getPriceBounds,
} from "@/app/_components/flight-filters";
import FlightFilters from "@/app/(marketing)/flights/_components/FlightFilters";
import FlightHero from "@/app/(marketing)/flights/_components/FlightHero";
import FlightResultCardSkeleton from "./_components/FlightResultCardSkeleton";
import FlightResultsHeader from "@/app/(marketing)/flights/_components/FlightResultsHeader";
import FlightSearch from "@/app/(marketing)/flights/_components/FlightSearch";
import FlightSort from "@/app/(marketing)/flights/_components/FlightSort";
import { adaptFlights } from "@/lib/flight-adapter";
import { getAllFlights } from "@/lib/services/apiFlights";
import FlightResultsSection from "./_components/FlightResultsSection";

export const metadata: Metadata = {
  title: "Flights",
};

interface FlightsPageProps {
  searchParams: Promise<FlightSearchParams>;
}

const SKELETON_COUNT = 5;

function ResultsListSkeleton() {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <FlightResultCardSkeleton key={index} />
      ))}
    </div>
  );
}

function FiltersSkeleton() {
  return (
    <aside className="w-full shrink-0 animate-pulse rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7 lg:w-[300px]">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-20 rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-4 w-full rounded-lg bg-slate-100 dark:bg-slate-800"
          />
        ))}
      </div>
    </aside>
  );
}

async function FlightFiltersPanel({
  allFlightsPromise,
}: {
  allFlightsPromise: ReturnType<typeof getAllFlights>;
}) {
  const res = await allFlightsPromise;
  const allFlights = adaptFlights(res?.data?.flights ?? []);

  const airlineOptions = getAirlineOptions(allFlights);
  const priceBounds = getPriceBounds(allFlights);

  return (
    <FlightFilters airlineOptions={airlineOptions} priceBounds={priceBounds} />
  );
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  // Start the filter-data request up front so it overlaps the results
  // request made inside the Suspense boundary. The shell below renders
  // (and the hero image starts loading) without waiting on the API.
  const allFlightsPromise = getAllFlights();

  return (
    <main className="min-h-screen pb-24 transition-colors duration-300">
      <FlightHero />

      <Suspense fallback={null}>
        <div className="relative z-10 mx-auto max-w-[1320px] px-6 -mt-24 sm:-mt-32 lg:-mt-36">
          <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
            <FlightSearch />
          </div>
        </div>

        <div className="mx-auto max-w-[1320px] px-6 py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <aside className="w-full lg:sticky lg:top-24 lg:w-[300px] lg:shrink-0 xl:w-[320px]">
              <Suspense fallback={<FiltersSkeleton />}>
                <FlightFiltersPanel allFlightsPromise={allFlightsPromise} />
              </Suspense>
            </aside>

            <section className="min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Suspense
                fallback={
                  <>
                    <FlightResultsHeader count={0} sortSlot={<FlightSort />} />
                    <ResultsListSkeleton />
                  </>
                }
              >
                <FlightResultsSection searchParams={searchParams} />
              </Suspense>
            </section>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
