import { Hotel } from "@/types/hotel";
import HotelCardHeader from "./HotelCardHeader";
import TicketDivider from "./TicketDivider";
import HotelCardFooter from "./HotelCardFooter";
import HotelAvailabilityStrip from "./HotelAvailabilityStrip";

export default function HotelCard({ data }: { data: Hotel }) {
  const {
    _id,
    name,
    location,
    starRating,
    availableRooms,
    totalRooms,
    minPrice,
    maxPrice,
  } = data;

  const isFullyBooked = availableRooms === 0;

  return (
    <div className="w-[305px] rounded-2xl overflow-hidden transition-shadow duration-200 bg-white shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-slate-200 dark:bg-slate-800 dark:shadow-none dark:hover:shadow-xl dark:hover:shadow-black/20">
      <HotelCardHeader
        name={name}
        city={location.city}
        starRating={starRating}
      />
      <HotelAvailabilityStrip
        availableRooms={availableRooms}
        totalRooms={totalRooms}
      />
      <TicketDivider />
      <HotelCardFooter
        hotelId={_id}
        minPrice={minPrice}
        maxPrice={maxPrice}
        isFullyBooked={isFullyBooked}
      />
    </div>
  );
}
