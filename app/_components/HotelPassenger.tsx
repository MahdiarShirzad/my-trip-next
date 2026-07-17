"use client";

import { useEffect, useRef, useState } from "react";

const roomTypes = ["Single Room", "Double Room", "Deluxe Room"];

export default function HotelPassenger() {
  const [tabIsOpen, setTabIsOpen] = useState<boolean>(false);
  const [roomType, setRoomType] = useState<string>("Double Room");

  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [roomNumber, setRoomNumber] = useState<number>(1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTabIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handlePassengerChange(
    category: "adults" | "children" | "infants",
    value: number,
  ) {
    if (category === "adults") setAdults((n) => Math.max(n + value, 1));
    if (category === "children") setChildren((n) => Math.max(n + value, 0));
    if (category === "infants") setInfants((n) => Math.max(n + value, 0));
  }

  function handleRoomNumber(value: number) {
    setRoomNumber((n) => Math.max(n + value, 1));
  }

  const totalGuests = adults + children + infants;

  const counters: {
    key: "adults" | "children" | "infants";
    label: string;
    hint: string;
    value: number;
  }[] = [
    { key: "adults", label: "Adults", hint: "12+ years", value: adults },
    { key: "children", label: "Children", hint: "2–12 years", value: children },
    { key: "infants", label: "Infant", hint: "Below 2 years", value: infants },
  ];

  return (
    <div
      className="relative max-lg:w-full lg:w-72 flex-shrink-0"
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setTabIsOpen((v) => !v)}
        className={`w-full text-left bg-slate-50 dark:bg-slate-800/60 rounded-2xl px-4 py-3.5 border transition-colors duration-150
          ${tabIsOpen ? "border-[#7167FF]/40 bg-[#7167FF0d]" : "border-transparent"}`}
      >
        <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
          <p className="text-xs font-semibold uppercase tracking-wide">
            Rooms, Guests
          </p>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${tabIsOpen ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-bold text-lg mt-1.5 text-slate-800 dark:text-white">
          {roomNumber} Room{roomNumber > 1 ? "s" : ""}, {totalGuests} Guest
          {totalGuests > 1 ? "s" : ""}
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
          {roomType}
        </p>
      </button>

      {tabIsOpen && (
        <div className="absolute z-30 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-2xl shadow-slate-900/15 dark:shadow-black/40 w-full min-w-[300px] mt-2 p-4 rounded-2xl right-0 border border-slate-100 dark:border-slate-700">
          <div className="flex flex-col gap-4">
            {counters.map(({ key, label, hint, value }) => (
              <div
                key={key}
                className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700"
              >
                <div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {hint}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePassengerChange(key, -1)}
                    disabled={key === "adults" ? value <= 1 : value <= 0}
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#7167FF] bg-[#7167FF1a] hover:bg-[#7167FF33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    −
                  </button>
                  <p className="text-base font-bold min-w-[16px] text-center">
                    {value}
                  </p>
                  <button
                    type="button"
                    onClick={() => handlePassengerChange(key, 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#7167FF] bg-[#7167FF1a] hover:bg-[#7167FF33] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            {/* Rooms counter — same row pattern, kept distinct from guest counters */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700">
              <p className="font-semibold text-sm">Rooms</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRoomNumber(-1)}
                  disabled={roomNumber <= 1}
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#7167FF] bg-[#7167FF1a] hover:bg-[#7167FF33] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  −
                </button>
                <p className="text-base font-bold min-w-[16px] text-center">
                  {roomNumber}
                </p>
                <button
                  type="button"
                  onClick={() => handleRoomNumber(1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[#7167FF] bg-[#7167FF1a] hover:bg-[#7167FF33] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="font-semibold text-sm mb-2.5">Room Type</p>
            <div className="flex flex-col gap-2">
              {roomTypes.map((type) => (
                <label
                  key={type}
                  htmlFor={type.toLowerCase().replace(" ", "-")}
                  className="flex items-center gap-2.5 cursor-pointer text-sm"
                >
                  <span
                    className={`relative w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                      ${roomType === type ? "border-[#7167FF]" : "border-slate-300 dark:border-slate-600"}`}
                  >
                    {roomType === type && (
                      <span className="w-2 h-2 rounded-full bg-[#7167FF]" />
                    )}
                  </span>
                  <input
                    className="sr-only"
                    type="radio"
                    name="roomType"
                    id={type.toLowerCase().replace(" ", "-")}
                    value={type}
                    checked={roomType === type}
                    onChange={(e) => setRoomType(e.target.value)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTabIsOpen(false)}
            className="w-full mt-4 bg-[#7167FF] hover:bg-[#5b51e6] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}
