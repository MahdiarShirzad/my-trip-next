"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";

const DEPARTURE_WINDOWS = [
  { key: "morning", label: "Morning", hint: "6:00 – 12:00" },
  { key: "afternoon", label: "Afternoon", hint: "12:00 – 18:00" },
  { key: "evening", label: "Evening", hint: "18:00 – 24:00" },
  { key: "night", label: "Night", hint: "0:00 – 6:00" },
] as const;

interface FlightFiltersProps {
  airlineOptions: string[];
  priceBounds: { min: number; max: number };
}

export default function FlightFilters({
  airlineOptions,
  priceBounds,
}: FlightFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeDepartures = searchParams.getAll("departure");
  const activeAirlines = searchParams.getAll("airline");

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice") ?? priceBounds.min),
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice") ?? priceBounds.max),
  );

  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState({
    price: true,
    departure: true,
    airlines: true,
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pushParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function toggleListParam(key: "departure" | "airline", value: string) {
    pushParams((params) => {
      const current = params.getAll(key);
      params.delete(key);
      if (current.includes(value)) {
        current
          .filter((v) => v !== value)
          .forEach((v) => params.append(key, v));
      } else {
        [...current, value].forEach((v) => params.append(key, v));
      }
    });
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushParams((params) => {
        params.set("minPrice", String(minPrice));
        params.set("maxPrice", String(maxPrice));
      });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [minPrice, maxPrice]);

  function resetFilters() {
    setMinPrice(priceBounds.min);
    setMaxPrice(priceBounds.max);
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }

  function toggleSection(key: keyof typeof openSections) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const hasActiveFilters =
    activeDepartures.length > 0 ||
    activeAirlines.length > 0 ||
    searchParams.has("minPrice") ||
    searchParams.has("maxPrice");

  if (!isOpen) {
    return (
      <aside className="flex w-full shrink-0 items-center justify-between rounded-[2rem] border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:w-[76px] lg:flex-col lg:items-center lg:justify-start lg:gap-5 lg:py-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-[#7167FF]/10 hover:text-[#7167FF] dark:text-slate-200"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M7 12h10M10 18h4"
            />
          </svg>
          <span className="lg:hidden">Show filters</span>
        </button>
        {hasActiveFilters && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#7167FF]" />
        )}
      </aside>
    );
  }

  return (
    <aside
      className={`w-full shrink-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-opacity duration-300 dark:border-slate-800 dark:bg-slate-900 lg:w-[300px] sm:p-7 ${
        isPending ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7167FF]/10 text-[#7167FF]">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M7 12h10M10 18h4"
              />
            </svg>
          </span>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Filters
          </h2>
        </div>
        <div className="flex items-center gap-1">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="rounded-lg px-2.5 py-2 text-sm font-bold text-[#7167FF] transition-colors hover:bg-[#7167FF]/10"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Collapse filters"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Price Range
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              openSections.price ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>
        {openSections.price && (
          <div className="pb-6">
            <div className="mb-4 flex items-center justify-between text-sm font-bold text-[#7167FF]">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
            <div className="space-y-4">
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice))
                }
                className="w-full accent-[#7167FF]"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice))
                }
                className="w-full accent-[#7167FF]"
                aria-label="Maximum price"
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("departure")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Departure Time
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              openSections.departure ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>
        {openSections.departure && (
          <div className="space-y-3 pb-6">
            {DEPARTURE_WINDOWS.map(({ key, label, hint }) => {
              const active = activeDepartures.includes(key);
              return (
                <label
                  key={key}
                  className={`group flex cursor-pointer items-center justify-between rounded-2xl border p-4 text-sm transition-all duration-200 ${
                    active
                      ? "border-[#7167FF] bg-[#7167FF]/10 text-[#7167FF] shadow-sm"
                      : "border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <span className="flex items-center gap-3 font-semibold">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleListParam("departure", key)}
                      className="h-4 w-4 rounded border-slate-300 accent-[#7167FF] dark:border-slate-700"
                    />
                    {label}
                  </span>
                  <span
                    className={`text-xs ${active ? "text-[#7167FF]/70" : "text-slate-400 dark:text-slate-500"}`}
                  >
                    {hint}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection("airlines")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Airlines
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              openSections.airlines ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>
        {openSections.airlines && (
          <div className="max-h-64 space-y-3 overflow-y-auto pb-2 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {airlineOptions.map((airline) => {
              const active = activeAirlines.includes(airline);
              return (
                <label
                  key={airline}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#7167FF] bg-[#7167FF]/10 text-[#7167FF] shadow-sm"
                      : "border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleListParam("airline", airline)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#7167FF] dark:border-slate-700"
                  />
                  {airline}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
