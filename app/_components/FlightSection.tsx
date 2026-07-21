import Link from "next/link";
import type { Flight } from "@/types/flight";
import FlightCard from "./FlightCard";
import FlightCardSkeleton from "./FlightCardSkeleton";
import Title from "./Title";
import { mockFlights } from "@/types/mock-flights";

const SKELETON_COUNT = 8;

export default async function FlightSection({
  data = mockFlights,
  isLoading = false,
}: {
  data?: Flight[];
  isLoading?: boolean;
}) {
  return (
    <section className="container mx-auto mt-20 max-w-[1320px] px-4 pb-6">
      <Title
        title="FLIGHTS"
        desc="Our Most Popular Flights"
        isCommentTitle={false}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <FlightCardSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          data.map((flight) => <FlightCard flight={flight} key={flight._id} />)
        ) : (
          <div className="col-span-full flex flex-col items-center gap-2 py-20 text-center">
            <PlaneOffIcon className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="font-interBold text-xl text-slate-700 dark:text-slate-300">
              No flights found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try different dates or a nearby airport to see more results.
            </p>
          </div>
        )}
      </div>

      {!isLoading && data && data.length > 0 && (
        <Link
          href="/flights"
          className="group mx-auto mt-10 flex w-fit items-center gap-2 rounded-xl bg-[#7167FF] px-6 py-3 font-interSemiBold text-white transition-colors hover:bg-[#5b52e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2"
        >
          Discover more
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
        </Link>
      )}
    </section>
  );
}

function PlaneOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <polygon
        points="3 11 22 2 13 21 11 13 3 11"
        fill="currentColor"
        opacity="0.5"
      />
      <line
        x1="3"
        y1="3"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
