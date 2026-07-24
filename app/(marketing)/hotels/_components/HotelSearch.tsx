"use client";

import { useRouter } from "next/navigation";
import { buildHotelSearchParams } from "@/lib/services/apiHotels";
import {
  HotelSearchProvider,
  useHotelSearch,
} from "@/app/_components/HotelSearchContext";
import HotelNameSearch from "../../../_components/HotelNameSearch";
import HotelCalendar from "../../../_components/HotelCalendar";
import HotelPassenger from "../../../_components/HotelPassenger";

function HotelSearchForm() {
  const router = useRouter();
  const {
    destinationCity,
    checkInDate,
    checkOutDate,
    adults,
    children,
    infants,
    roomNumber,
    roomType,
  } = useHotelSearch();

  function handleSearch() {
    if (!destinationCity.trim()) {
      alert("لطفا مقصد یا نام هتل را وارد کنید");
      return;
    }
    if (!checkInDate || !checkOutDate) return;

    const params = buildHotelSearchParams({
      destinationCity,
      checkInDate,
      checkOutDate,
      adults,
      children,
      infants,
      roomNumber,
      roomType,
    });

    router.push(`/hotels?${new URLSearchParams(params).toString()}`);
  }

  return (
    <div className="text-slate-700 dark:text-slate-200">
      <div className="flex max-lg:flex-col justify-between items-stretch gap-4">
        <HotelNameSearch />
        <HotelCalendar />
        <HotelPassenger />
      </div>

      <div className="flex items-center justify-center mt-6">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-[#7167FF] hover:bg-[#5b51e6] text-white font-bold px-10 py-3.5 rounded-full shadow-lg shadow-[#7167FF]/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm tracking-wide"
        >
          Search Available Stays
        </button>
      </div>
    </div>
  );
}

function HotelSearch() {
  return (
    <HotelSearchProvider>
      <HotelSearchForm />
    </HotelSearchProvider>
  );
}

export default HotelSearch;
