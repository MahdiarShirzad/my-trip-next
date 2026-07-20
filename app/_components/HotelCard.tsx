import { Hotel } from "@/types/hotel";
import HotelAvailabilityStrip from "./HotelAvailabilityStrip";
import HotelCardFooter from "./HotelCardFooter";
import HotelCardHeader from "./HotelCardHeader";
import HotelCardImage from "./HotelCardImage";
import TicketDivider from "./TicketDivider";

export default function HotelCard({ data }: { data: Hotel }) {
  const {
    _id,
    name,
    location,
    starRating,
    images,
    availableRooms,
    totalRooms,
    minPrice,
    maxPrice,
  } = data;

  const isFullyBooked = availableRooms === 0;
  const coverImage = images[0];

  return (
    <div className="group w-[305px] rounded-2xl overflow-hidden transition-all duration-300 bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/80 hover:-translate-y-1 dark:bg-slate-800 dark:border-slate-700/60 dark:hover:shadow-2xl dark:hover:shadow-black/30">
      <div className="relative">
        {coverImage && (
          <HotelCardImage
            src={coverImage}
            alt={name}
            isFullyBooked={isFullyBooked}
          />
        )}
      </div>

      <HotelCardHeader
        name={name}
        city={location.city}
        starRating={starRating}
      />

      <div className="px-5">
        <HotelAvailabilityStrip
          availableRooms={availableRooms}
          totalRooms={totalRooms}
        />
      </div>

      <div className="px-5">
        <TicketDivider />
      </div>

      <HotelCardFooter
        hotelId={_id}
        minPrice={minPrice}
        maxPrice={maxPrice}
        isFullyBooked={isFullyBooked}
      />
    </div>
  );
}
