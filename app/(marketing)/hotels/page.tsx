import {
  filterHotels,
  getPriceBounds,
  getPropertyTypeOptions,
  HotelSearchParams,
  sortHotels,
} from "@/lib/hotel-filters";
import HotelFilters from "@/app/(marketing)/hotels/_components/HotelFilters";
import HotelHero from "@/app/(marketing)/hotels/_components/HotelHero";
import HotelResultCard from "@/app/(marketing)/hotels/_components/HotelResultCard";
import HotelResultsHeader from "@/app/(marketing)/hotels/_components/HotelResultsHeader";
import HotelSearch from "@/app/(marketing)/hotels/_components/HotelSearch";
import HotelSort from "@/app/(marketing)/hotels/_components/HotelSort";
import { mockHotels } from "@/app/_components/mockHotels";
import { Hotel } from "./hotel";
import { Metadata } from "next";
// import { mockHotels } from "@/types/mockHotels";

export const metadata: Metadata = {
  title: "Hotels",
};

async function getHotels(): Promise<Hotel[]> {
  const res = await fetch(`${process.env.API_URL}/hotels`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to load hotels");
  const json = await res.json();
  return json.data as Hotel[];
}
void getHotels; // wire this in once the API is ready; mockHotels is used below for now

interface HotelsPageProps {
  searchParams: Promise<HotelSearchParams>;
}

export default async function HotelsPage({ searchParams }: HotelsPageProps) {
  const params = await searchParams;
  const allHotels = mockHotels as Hotel[];

  const propertyTypeOptions = getPropertyTypeOptions(allHotels);
  const priceBounds = getPriceBounds(allHotels);

  const filtered = filterHotels(allHotels, params);
  const results = sortHotels(filtered, params.sort);

  return (
    <main className="min-h-screen pb-24 transition-colors duration-300">
      <HotelHero />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 -mt-24 sm:-mt-32 lg:-mt-36">
        <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 sm:p-8">
          <HotelSearch />
          <div className="flex items-center justify-center mt-6">
            <button className="bg-[#7167FF] hover:bg-[#5b51e6] text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-[#7167FF]/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm tracking-wide">
              Search Available Stays
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <aside className="w-full lg:sticky lg:top-24 lg:w-[300px] lg:shrink-0 xl:w-[320px]">
            <HotelFilters
              propertyTypeOptions={propertyTypeOptions}
              priceBounds={priceBounds}
            />
          </aside>

          <section className="min-w-0 flex-1 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <HotelResultsHeader
              count={results.length}
              sortSlot={<HotelSort />}
            />

            {results.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.map((hotel) => (
                  <HotelResultCard key={hotel._id} hotel={hotel} />
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
                    <path d="M7 13c0-2.76 2.24-5 5-5s5 2.24 5 5v3H7v-3zm-3 5h16v2H4v-2zM6 8a2 2 0 114 0 2 2 0 01-4 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  No hotels match your filters
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
