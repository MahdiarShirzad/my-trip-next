"use client";

import { useState } from "react";
import FlightCities from "./FlightCities";
import FlightCalendar from "./FlightCalendar";
import FlightPassenger from "./FlightPassenger";

function FlightSearch() {
  const [flightType, setFlightType] = useState<string>("One Way");

  function handleClassChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFlightType(event.target.value);
  }

  return (
    <div className="text-slate-700 dark:text-slate-200">
      <form className="flex gap-6 mb-5">
        {["One Way", "Round Way"].map((type) => (
          <label
            key={type}
            htmlFor={type.replace(" ", "")}
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer select-none"
          >
            <span
              className={`relative w-4 h-4 rounded-full border-2 transition-colors duration-150 flex items-center justify-center
                ${flightType === type ? "border-[#7167FF]" : "border-slate-300 dark:border-slate-600"}`}
            >
              {flightType === type && (
                <span className="w-2 h-2 rounded-full bg-[#7167FF]" />
              )}
            </span>
            <input
              className="sr-only"
              type="radio"
              name="flightType"
              value={type}
              id={type.replace(" ", "")}
              checked={flightType === type}
              onChange={handleClassChange}
            />
            {type}
          </label>
        ))}
      </form>

      <div className="flex max-lg:flex-col justify-between items-stretch gap-4">
        <FlightCities />
        <FlightCalendar type={flightType} />
        <FlightPassenger />
      </div>
    </div>
  );
}

export default FlightSearch;
