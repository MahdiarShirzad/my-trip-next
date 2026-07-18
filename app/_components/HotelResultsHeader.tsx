import type { ReactNode } from "react";

interface HotelResultsHeaderProps {
  count: number;
  sortSlot: ReactNode;
}

export default function HotelResultsHeader({
  count,
  sortSlot,
}: HotelResultsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5 dark:border-slate-800 dark:bg-slate-950/40 sm:px-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7167FF]/10 text-[#7167FF]">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
          >
            <path d="M7 13c0-2.76 2.24-5 5-5s5 2.24 5 5v3H7v-3zm-3 5h16v2H4v-2zM6 8a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </span>
        <p className="text-base font-medium text-slate-600 dark:text-slate-300">
          <span className="font-extrabold text-slate-900 dark:text-white">
            {count}
          </span>{" "}
          {count === 1 ? "hotel" : "hotels"} found
        </p>
      </div>
      {sortSlot}
    </div>
  );
}
