"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFlightSearch } from "./FlightSearchContext";

export default function FlightDatePickers() {
  const { flightType, journeyDate, setJourneyDate, returnDate, setReturnDate } =
    useFlightSearch();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <DatePicker
          className="w-full bg-transparent font-bold text-lg outline-none text-slate-800 dark:text-white cursor-pointer"
          calendarClassName="mytrip-datepicker"
          popperClassName="mytrip-datepicker-popper"
          selected={journeyDate}
          onChange={(date: Date | null) => date && setJourneyDate(date)}
          dateFormat="MMM d, yyyy"
          minDate={new Date()}
        />
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          {weekDays[journeyDate.getDay()]}
        </p>
      </div>

      {flightType === "Round Way" && (
        <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-3">
          <DatePicker
            className="w-full bg-transparent font-bold text-lg outline-none text-slate-800 dark:text-white cursor-pointer"
            calendarClassName="mytrip-datepicker"
            popperClassName="mytrip-datepicker-popper"
            selected={returnDate}
            onChange={(date: Date | null) => date && setReturnDate(date)}
            dateFormat="MMM d, yyyy"
            minDate={journeyDate}
          />
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
            {weekDays[returnDate.getDay()]}
          </p>
        </div>
      )}
    </div>
  );
}
