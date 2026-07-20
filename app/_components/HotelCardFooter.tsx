import Link from "next/link";

function formatPriceRange(minPrice: number, maxPrice: number): string {
  if (minPrice === maxPrice) return `$${minPrice}`;
  return `$${minPrice} - $${maxPrice}`;
}

export default function HotelCardFooter({
  hotelId,
  minPrice,
  maxPrice,
  isFullyBooked,
}: {
  hotelId: string;
  minPrice: number;
  maxPrice: number;
  isFullyBooked: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <p className="font-inter text-[11px] text-slate-400 dark:text-slate-500">
          Per night
        </p>
        <p className="font-interMedium text-lg leading-tight text-[#e0575a]">
          {minPrice === maxPrice ? (
            `$${minPrice}`
          ) : (
            <>
              ${minPrice}
              <span className="text-sm font-inter font-normal text-slate-400 dark:text-slate-500">
                {" "}
                - ${maxPrice}
              </span>
            </>
          )}
        </p>
      </div>

      <Link
        href={`/hotels/${hotelId}`}
        aria-disabled={isFullyBooked}
        tabIndex={isFullyBooked ? -1 : undefined}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-interSemiBold text-sm transition-all ${
          isFullyBooked
            ? "pointer-events-none bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            : "bg-[#7167FF] text-white hover:bg-[#5f56e6] hover:shadow-md hover:shadow-[#7167FF]/30 active:scale-95"
        }`}
      >
        <span>{isFullyBooked ? "Full" : "Details"}</span>
        {!isFullyBooked && (
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>
    </div>
  );
}
