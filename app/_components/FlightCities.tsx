"use client";

import React, { useState } from "react";
import { useFlightSearch } from "./FlightSearchContext";
import { AIRPORTS, findAirportByCity } from "./airports";

export default function FlightCities() {
  const {
    originCity,
    setOriginCity,
    setOriginCode,
    destinationCity,
    setDestinationCity,
    setDestinationCode,
    swapCities,
  } = useFlightSearch();

  const [openField, setOpenField] = useState<"origin" | "destination" | null>(
    null,
  );

  const canSwap = Boolean(originCity || destinationCity);

  function suggestionsFor(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return AIRPORTS;
    return AIRPORTS.filter((a) => a.city.toLowerCase().includes(q));
  }

  function pickOrigin(city: string, code: string) {
    setOriginCity(city);
    setOriginCode(code);
    setOpenField(null);
  }

  function pickDestination(city: string, code: string) {
    setDestinationCity(city);
    setDestinationCode(code);
    setOpenField(null);
  }

  return (
    <div className="flex items-stretch relative max-lg:w-full w-full lg:flex-1">
      {/* Origin */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#7167FF]/40 focus-within:bg-[#7167FF0d] transition-colors duration-150 relative">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <p className="text-xs font-semibold uppercase tracking-wide">From</p>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 19h19M6.5 15l3-8.5a1 1 0 0 1 1.9 0l1.1 3.1 5-1.8a1.5 1.5 0 0 1 1.9 1.9l-1.8 5 3.1 1.1a1 1 0 0 1 0 1.9L12.2 20a1 1 0 0 1-1.2-.5L9.5 16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          className="font-bold text-lg mt-1.5 block bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-semibold w-full text-slate-800 dark:text-white"
          placeholder="Origin"
          value={originCity}
          onChange={(e) => {
            setOriginCity(e.target.value);
            setOriginCode(""); // تا وقتی از لیست انتخاب نشه، کد معتبر نیست
          }}
          onFocus={() => setOpenField("origin")}
          autoComplete="off"
        />

        {openField === "origin" && (
          <ul className="absolute left-0 right-0 top-full mt-2 z-30 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
            {suggestionsFor(originCity).map((a) => (
              <li key={a.code}>
                <button
                  type="button"
                  onMouseDown={() => pickOrigin(a.city, a.code)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#7167FF1a] flex justify-between"
                >
                  <span>{a.city}</span>
                  <span className="text-slate-400">{a.code}</span>
                </button>
              </li>
            ))}
            {suggestionsFor(originCity).length === 0 && (
              <li className="px-4 py-2.5 text-sm text-slate-400">No matches</li>
            )}
          </ul>
        )}
      </div>

      {/* Swap */}
      <button
        type="button"
        onClick={canSwap ? swapCities : undefined}
        disabled={!canSwap}
        aria-label="Swap origin and destination"
        className={`flex-shrink-0 self-center rounded-full p-2 border-2 -mx-3 z-10 bg-white dark:bg-slate-900 transition-all duration-200
          ${
            canSwap
              ? "border-[#7167FF] text-[#7167FF] hover:bg-[#7167FF] hover:text-white cursor-pointer shadow-md shadow-[#7167FF]/15"
              : "border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
          }`}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8L3 4m0 0L7 0M3 4h13m1 12l4-4m0 0l-4-4m4 4H4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Destination */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 border border-transparent focus-within:border-[#7167FF]/40 focus-within:bg-[#7167FF0d] transition-colors duration-150 relative">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <p className="text-xs font-semibold uppercase tracking-wide">To</p>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 19h-19M17.5 15l-3-8.5a1 1 0 0 0-1.9 0l-1.1 3.1-5-1.8a1.5 1.5 0 0 0-1.9 1.9l1.8 5-3.1 1.1a1 1 0 0 0 0 1.9L11.8 20a1 1 0 0 0 1.2-.5l1.5-3"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          className="font-bold text-lg mt-1.5 block bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-semibold w-full text-slate-800 dark:text-white"
          placeholder="Destination"
          value={destinationCity}
          onChange={(e) => {
            setDestinationCity(e.target.value);
            setDestinationCode("");
          }}
          onFocus={() => setOpenField("destination")}
          autoComplete="off"
        />

        {openField === "destination" && (
          <ul className="absolute left-0 right-0 top-full mt-2 z-30 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
            {suggestionsFor(destinationCity).map((a) => (
              <li key={a.code}>
                <button
                  type="button"
                  onMouseDown={() => pickDestination(a.city, a.code)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#7167FF1a] flex justify-between"
                >
                  <span>{a.city}</span>
                  <span className="text-slate-400">{a.code}</span>
                </button>
              </li>
            ))}
            {suggestionsFor(destinationCity).length === 0 && (
              <li className="px-4 py-2.5 text-sm text-slate-400">No matches</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
