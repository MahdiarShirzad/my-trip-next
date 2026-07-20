"use client";

import HotelCalendar from "../../../_components/HotelCalendar";
import HotelNameSearch from "../../../_components/HotelNameSearch";
import HotelPassenger from "../../../_components/HotelPassenger";

function HotelSearch() {
  return (
    <div className="flex max-lg:flex-col justify-between items-stretch gap-4 text-slate-700 dark:text-slate-200">
      <HotelNameSearch />
      <HotelCalendar />
      <HotelPassenger />
    </div>
  );
}

export default HotelSearch;
