"use client";

import { useHotelSearch } from "./HotelSearchContext";

export default function HotelNameSearch() {
  const { destinationCity, setDestinationCity } = useHotelSearch();

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#7167FF]/40 focus-within:bg-[#7167FF0d] transition-colors duration-150">
      <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
        <p className="text-xs font-semibold uppercase tracking-wide">
          Destination
        </p>
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 7v5l3 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        className="font-bold text-lg mt-1.5 block bg-transparent focus:outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 placeholder:font-semibold w-full text-slate-800 dark:text-white"
        placeholder="Hotel or city"
        value={destinationCity}
        onChange={(e) => setDestinationCity(e.target.value)}
      />
      {destinationCity === "" && (
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          Search by name or destination
        </p>
      )}
    </div>
  );
}
