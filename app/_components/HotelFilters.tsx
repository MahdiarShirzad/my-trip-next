"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import {
  AMENITIES_OPTIONS,
  GUEST_RATING_THRESHOLDS,
  PROPERTY_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS,
} from "@/lib/hotel-filters";

interface HotelFiltersProps {
  propertyTypeOptions: string[];
  priceBounds: { min: number; max: number };
}

export default function HotelFilters({
  propertyTypeOptions,
  priceBounds,
}: HotelFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeStars = searchParams.getAll("star");
  const activePropertyTypes = searchParams.getAll("propertyType");
  const activeRoomTypes = searchParams.getAll("roomType");
  const activeAmenities = searchParams.getAll("amenity");
  const activeMinGuestRating = searchParams.get("minGuestRating");

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice") ?? priceBounds.min),
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice") ?? priceBounds.max),
  );

  const [isOpen, setIsOpen] = useState(true);
  const [openSections, setOpenSections] = useState({
    price: true,
    stars: true,
    guestRating: true,
    amenities: true,
    propertyType: true,
    roomType: true,
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pushParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function toggleListParam(
    key: "star" | "propertyType" | "roomType" | "amenity",
    value: string,
  ) {
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

  function toggleGuestRating(threshold: number) {
    pushParams((params) => {
      const isActive = params.get("minGuestRating") === String(threshold);
      if (isActive) {
        params.delete("minGuestRating");
      } else {
        params.set("minGuestRating", String(threshold));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    activeStars.length > 0 ||
    activePropertyTypes.length > 0 ||
    activeRoomTypes.length > 0 ||
    activeAmenities.length > 0 ||
    !!activeMinGuestRating ||
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

      {/* Price range */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Price Range
          </span>
          <ChevronIcon open={openSections.price} />
        </button>
        {openSections.price && (
          <div className="pb-6">
            <div className="mb-4 flex items-center justify-between text-sm font-bold text-[#7167FF]">
              <span>${minPrice.toLocaleString()}</span>
              <span>${maxPrice.toLocaleString()}</span>
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

      {/* Star rating */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("stars")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Star Rating
          </span>
          <ChevronIcon open={openSections.stars} />
        </button>
        {openSections.stars && (
          <div className="space-y-3 pb-6">
            {[5, 4, 3, 2, 1].map((star) => {
              const active = activeStars.includes(String(star));
              return (
                <label
                  key={star}
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
                      onChange={() => toggleListParam("star", String(star))}
                      className="h-4 w-4 rounded border-slate-300 accent-[#7167FF] dark:border-slate-700"
                    />
                    {star} Star
                  </span>
                  <StarIcon filled={active} />
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Guest rating */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("guestRating")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Guest Rating
          </span>
          <ChevronIcon open={openSections.guestRating} />
        </button>
        {openSections.guestRating && (
          <div className="flex flex-wrap gap-2 pb-6">
            {GUEST_RATING_THRESHOLDS.map((threshold) => {
              const active = activeMinGuestRating === String(threshold);
              return (
                <button
                  key={threshold}
                  onClick={() => toggleGuestRating(threshold)}
                  className={`rounded-full border px-4 py-2 text-xs font-bold transition-colors duration-200 ${
                    active
                      ? "border-[#7167FF] bg-[#7167FF]/10 text-[#7167FF]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700"
                  }`}
                >
                  {threshold.toFixed(1)}+
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("amenities")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Amenities
          </span>
          <ChevronIcon open={openSections.amenities} />
        </button>
        {openSections.amenities && (
          <div className="max-h-64 space-y-3 overflow-y-auto pb-2 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {AMENITIES_OPTIONS.map((amenity) => {
              const active = activeAmenities.includes(amenity);
              return (
                <label
                  key={amenity}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#7167FF] bg-[#7167FF]/10 text-[#7167FF] shadow-sm"
                      : "border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleListParam("amenity", amenity)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#7167FF] dark:border-slate-700"
                  />
                  {amenity}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Property type */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => toggleSection("propertyType")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Property Type
          </span>
          <ChevronIcon open={openSections.propertyType} />
        </button>
        {openSections.propertyType && (
          <div className="space-y-3 pb-6">
            {PROPERTY_TYPE_OPTIONS.filter((opt) =>
              propertyTypeOptions.includes(opt.value),
            ).map(({ value, label }) => {
              const active = activePropertyTypes.includes(value);
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#7167FF] bg-[#7167FF]/10 text-[#7167FF] shadow-sm"
                      : "border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleListParam("propertyType", value)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#7167FF] dark:border-slate-700"
                  />
                  {label}
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* Room type */}
      <div>
        <button
          onClick={() => toggleSection("roomType")}
          className="flex w-full items-center justify-between py-4 text-left"
        >
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Room Type
          </span>
          <ChevronIcon open={openSections.roomType} />
        </button>
        {openSections.roomType && (
          <div className="space-y-3 pb-2">
            {ROOM_TYPE_OPTIONS.map(({ value, label }) => {
              const active = activeRoomTypes.includes(value);
              return (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border-[#7167FF] bg-[#7167FF]/10 text-[#7167FF] shadow-sm"
                      : "border-slate-200 bg-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleListParam("roomType", value)}
                    className="h-4 w-4 rounded border-slate-300 accent-[#7167FF] dark:border-slate-700"
                  />
                  {label}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${filled ? "fill-[#7167FF]" : "fill-slate-300 dark:fill-slate-700"}`}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}
