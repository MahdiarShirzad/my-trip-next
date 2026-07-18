import type { ReactNode } from "react";

interface FlightResultsHeaderProps {
  count: number;
  sortSlot: ReactNode;
}

export default function FlightResultsHeader({
  count,
  sortSlot,
}: FlightResultsHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-7 py-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7167FF]/10 text-[#7167FF]">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
          >
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </span>
        <p className="text-base font-medium text-slate-600 dark:text-slate-300">
          <span className="font-extrabold text-slate-900 dark:text-white">
            {count}
          </span>{" "}
          {count === 1 ? "flight" : "flights"} found
        </p>
      </div>
      {sortSlot}
    </div>
  );
}
