// components/hotels/HotelCard.tsx
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Hotel } from "../(marketing)/hotels/hotel";

export default function HotelCardPage({ hotel }: { hotel: Hotel }) {
  const visibleAmenities = hotel.amenities.slice(0, 3);
  const extraAmenities = hotel.amenities.length - visibleAmenities.length;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium capitalize text-slate-700">
          {hotel.propertyType}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-slate-800">
            {hotel.name}
          </h3>
          <div className="flex shrink-0 items-center gap-0.5">
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" />
          {hotel.location.city}
        </div>

        <p className="line-clamp-2 text-xs text-slate-500">
          {hotel.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {visibleAmenities.map((a) => (
            <span
              key={a}
              className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500"
            >
              {a}
            </span>
          ))}
          {extraAmenities > 0 && (
            <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">
              +{extraAmenities} more
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
            {hotel.guestRating.toFixed(1)}
            <span className="text-[11px] font-normal text-blue-500">
              ({hotel.reviewCount})
            </span>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">from</div>
            <div className="font-semibold text-slate-800">
              {hotel.minPrice.toLocaleString("en-US")}
              <span className="ml-1 text-xs font-normal text-slate-400">
                تومان/night
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
