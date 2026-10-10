"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHotelSearch } from "./HotelSearchContext";

export default function HotelDatePickers() {
  const { checkInDate, setCheckInDate, checkOutDate, setCheckOutDate } =
    useHotelSearch();

  if (!checkInDate || !checkOutDate) return null;

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <DatePicker
          className="w-full bg-transparent font-bold text-lg outline-none text-slate-800 dark:text-white cursor-pointer"
          calendarClassName="mytrip-datepicker"
          popperClassName="mytrip-datepicker-popper"
          selected={checkInDate}
          onChange={(date: Date | null) => date && setCheckInDate(date)}
          dateFormat="MMM d, yyyy"
          minDate={new Date()}
        />
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          {weekDays[checkInDate.getDay()]}
        </p>
      </div>

      <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-3">
        <DatePicker
          className="w-full bg-transparent font-bold text-lg outline-none text-slate-800 dark:text-white cursor-pointer"
          calendarClassName="mytrip-datepicker"
          popperClassName="mytrip-datepicker-popper"
          selected={checkOutDate}
          onChange={(date: Date | null) => date && setCheckOutDate(date)}
          dateFormat="MMM d, yyyy"
          minDate={new Date(checkInDate.getTime() + 86400000)}
        />
        <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-0.5">
          {weekDays[checkOutDate.getDay()]}
        </p>
      </div>
    </div>
  );
}
