import Image from "next/image";
import { Hotel } from "../hotel";
// import { Hotel } from "../hotel";

interface HotelResultCardProps {
  hotel: Hotel;
}

export default function HotelResultCard({ hotel }: HotelResultCardProps) {
  const visibleAmenities = hotel.amenities.slice(0, 3);
  const extraAmenities = hotel.amenities.length - visibleAmenities.length;

  const roomsLow = hotel.availableRooms > 0 && hotel.availableRooms <= 3;
  const soldOut = hotel.availableRooms === 0;

  return (
    <article className="group relative flex flex-col transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/40 sm:flex-row">
      {/* Image */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 sm:h-auto sm:w-[240px]">
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 240px"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold capitalize text-slate-700 backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-200">
          {hotel.propertyType}
        </span>
      </div>

      <div
        aria-hidden
        className="hidden h-full w-px border-l-2 border-dashed border-slate-200 dark:border-slate-800 sm:block"
      />

      {/* Details */}
      <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:pl-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="truncate text-lg font-extrabold text-slate-900 dark:text-white">
              {hotel.name}
            </h3>
            <div className="flex shrink-0 items-center gap-0.5">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>

          <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <PinIcon />
            {hotel.location.city}
          </p>

          <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {hotel.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleAmenities.map((a) => (
              <span
                key={a}
                className="rounded-lg bg-[#7167FF]/10 px-2.5 py-1 text-xs font-semibold text-[#7167FF]"
              >
                {a}
              </span>
            ))}
            {extraAmenities > 0 && (
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                +{extraAmenities} more
              </span>
            )}
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#7167FF]/10 px-2.5 py-1 text-xs font-bold text-[#7167FF]">
            {hotel.guestRating.toFixed(1)}
            <span className="font-normal text-[#7167FF]/70">
              ({hotel.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:border-dashed sm:border-slate-200 sm:pl-8 sm:pt-0 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              from
            </p>
            <p className="text-2xl font-extrabold text-[#7167FF]">
              {hotel.minPrice.toLocaleString()}
              <span className="ml-1 text-xs font-semibold text-slate-400 dark:text-slate-500">
                / night
              </span>
            </p>

            {soldOut ? (
              <p className="mt-1 inline-flex rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-500 dark:bg-rose-500/10 dark:text-rose-400">
                Sold out
              </p>
            ) : roomsLow ? (
              <p className="mt-1 inline-flex rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                {hotel.availableRooms} rooms left
              </p>
            ) : (
              <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Rooms available
              </p>
            )}
          </div>

          <a
            href={soldOut ? undefined : `/hotels/${hotel._id}/booking`}
            aria-disabled={soldOut}
            className={`group/btn flex shrink-0 items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-200 ${
              soldOut
                ? "pointer-events-none bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                : "bg-[#7167FF] text-white shadow-md shadow-[#7167FF]/20 hover:bg-[#5b50f0] hover:shadow-lg hover:shadow-[#7167FF]/35"
            }`}
          >
            {soldOut ? "Unavailable" : "View Hotel"}

            {!soldOut && (
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </a>
        </div>
      </div>
    </article>
  );
}

function StarIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-amber-400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-7-6.4-7-11a7 7 0 0114 0c0 4.6-7 11-7 11z"
      />
      <circle cx="12" cy="10" r="2.5" strokeLinecap="round" />
    </svg>
  );
}
