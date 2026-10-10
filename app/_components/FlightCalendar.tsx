"use client";

import dynamic from "next/dynamic";
import { useFlightSearch } from "./FlightSearchContext";

// react-datepicker (plus date-fns/floating-ui, ~174KB) is only needed once
// the user interacts with a date field — keep it out of the initial bundle.
// The fallback mirrors the loaded layout so nothing shifts while it loads.
const FlightDatePickers = dynamic(() => import("./FlightDatePickers"), {
  ssr: false,
  loading: () => <FlightDatePickersFallback />,
});

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FlightDatePickersFallback() {
  const { flightType, journeyDate, returnDate } = useFlightSearch();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <span className="block w-full font-bold text-lg text-slate-800 dark:text-white">
          {formatShortDate(journeyDate)}
        </span>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          {weekDays[journeyDate.getDay()]}
        </p>
      </div>

      {flightType === "Round Way" && (
        <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-3">
          <span className="block w-full font-bold text-lg text-slate-800 dark:text-white">
            {formatShortDate(returnDate)}
          </span>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
            {weekDays[returnDate.getDay()]}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FlightCalendar({ type }: { type: string }) {
  return (
    <div className="flex-1 max-lg:w-full">
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 h-full">
        <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide">
            {type === "Round Way" ? "Journey / Return" : "Journey Date"}
          </p>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 9h18M7 3v4M17 3v4M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <FlightDatePickers />
      </div>
    </div>
  );
}
