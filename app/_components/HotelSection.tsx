import Title from "./Title";
import HotelCardSkeleton from "./HotelCardSkeleton";
import HotelCard from "./HotelCard";
import { mockHotels } from "./mockHotels";
import Link from "next/link";

const SKELETON_COUNT = 4;

export default function HotelSection() {
  const isLoading = false;
  const data = mockHotels;

  return (
    <div className="w-full shrink-0 bg-slate-100 py-20 dark:bg-slate-900">
      <div className="container mx-auto max-w-[1320px]">
        <Title
          title="HOTEL"
          desc="Our Most Popular Hotels"
          isCommentTitle={false}
        />

        {isLoading ? (
          <div className="grid grid-cols-[repeat(auto-fit,305px)] justify-center gap-8 pt-10 max-lg:px-6">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <HotelCardSkeleton key={index} />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,305px)] justify-center gap-8 pt-10 max-lg:px-6">
            {data.map((hotel) => (
              <HotelCard data={hotel} key={hotel._id} />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-2 py-20 text-center">
            <HotelOffIcon className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="font-interBold text-xl text-slate-700 dark:text-slate-300">
              No hotels found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Try adjusting your dates or destination to see more options.
            </p>
          </div>
        )}

        <Link
          href="/hotels"
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
      </div>
    </div>
  );
}

function HotelOffIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21V6a1 1 0 011-1h9a1 1 0 011 1v15" />
      <path d="M14 12h5a1 1 0 011 1v8" />
      <path d="M7 8h1M7 12h1M7 16h1" />
      <path d="M3 21h18" />
    </svg>
  );
}
