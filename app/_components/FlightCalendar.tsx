"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFlightSearch } from "./FlightSearchContext";

export default function FlightCalendar({ type }: { type: string }) {
  const { journeyDate, setJourneyDate, returnDate, setReturnDate } =
    useFlightSearch();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

          {type === "Round Way" && (
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
      </div>
    </div>
  );
}
