"use client";

import dynamic from "next/dynamic";
import { useHotelSearch } from "./HotelSearchContext";

// react-datepicker (plus date-fns/floating-ui, ~174KB) is only needed once
// the user interacts with a date field — keep it out of the initial bundle.
// The fallback mirrors the loaded layout so nothing shifts while it loads.
const HotelDatePickers = dynamic(() => import("./HotelDatePickers"), {
  ssr: false,
  loading: () => <HotelDatePickersFallback />,
});

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function HotelDatePickersFallback() {
  const { checkInDate, checkOutDate } = useHotelSearch();

  if (!checkInDate || !checkOutDate) return null;

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <span className="block w-full font-bold text-lg text-slate-800 dark:text-white">
          {formatShortDate(checkInDate)}
        </span>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          {weekDays[checkInDate.getDay()]}
        </p>
      </div>

      <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-3">
        <span className="block w-full font-bold text-lg text-slate-800 dark:text-white">
          {formatShortDate(checkOutDate)}
        </span>
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          {weekDays[checkOutDate.getDay()]}
        </p>
      </div>
    </div>
  );
}

export default function HotelCalendar() {
  const { checkInDate, checkOutDate } = useHotelSearch();

  if (!checkInDate || !checkOutDate) {
    return (
      <div className="flex-1 max-lg:w-full">
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 h-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex-1 max-lg:w-full">
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 h-full">
        <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide">
            Check In / Check Out
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

        <HotelDatePickers />
      </div>
    </div>
  );
}
