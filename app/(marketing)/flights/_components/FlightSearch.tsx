"use client";

import { useRouter } from "next/navigation";
import { buildFlightSearchParams } from "@/lib/services/apiFlights";
import {
  FlightSearchProvider,
  useFlightSearch,
} from "@/app/_components/FlightSearchContext";
import FlightCalendar from "@/app/_components/FlightCalendar";
import FlightPassenger from "@/app/_components/FlightPassenger";
import FlightCities from "@/app/_components/FlightCities";

function FlightSearchForm() {
  const router = useRouter();
  const {
    flightType,
    setFlightType,
    originCode,
    destinationCode,
    journeyDate,
    returnDate,
    adults,
    children,
    infants,
    classType,
  } = useFlightSearch();

  function handleClassChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFlightType(event.target.value);
  }

  function handleSearch() {
    if (!originCode || !destinationCode) {
      alert("please select the origin and destination");
      return;
    }

    const params = buildFlightSearchParams({
      flightType,
      originCode,
      destinationCode,
      journeyDate,
      returnDate,
      adults,
      children,
      infants,
      classType,
    });

    router.push(`/flights?${new URLSearchParams(params).toString()}`);
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

      <div className="flex items-center justify-center mt-6">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-[#7167FF] hover:bg-[#5b51e6] text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-[#7167FF]/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm tracking-wide"
        >
          Search Available Options
        </button>
      </div>
    </div>
  );
}

function FlightSearch() {
  return (
    <FlightSearchProvider>
      <FlightSearchForm />
    </FlightSearchProvider>
  );
}

export default FlightSearch;
