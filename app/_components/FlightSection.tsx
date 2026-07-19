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
    <section className="container mx-auto mt-20 max-w-[1320px] px-4">
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
          <p className="col-span-full my-20 text-center font-interBlack text-4xl text-slate-800 dark:text-slate-300">
            No flights found...
          </p>
        )}
      </div>

      {!isLoading && data && data.length > 0 && (
        <Link
          href="/flights"
          className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-xl bg-[#7167FF] px-6 py-3 font-interSemiBold text-white transition-colors hover:bg-[#5b52e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2"
        >
          Discover more
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
        </Link>
      )}
    </section>
  );
}
