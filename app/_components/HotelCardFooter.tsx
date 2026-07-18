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
        <p className="font-inter text-[11px] text-slate-400">Per night</p>
        <p className="flex items-baseline gap-0.5 font-interBold text-xl text-[#f96768]">
          {formatPriceRange(minPrice, maxPrice)}
        </p>
      </div>

      <Link
        href={`/hotels/${hotelId}`}
        aria-disabled={isFullyBooked}
        tabIndex={isFullyBooked ? -1 : undefined}
        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-interSemiBold text-sm transition-colors ${
          isFullyBooked
            ? "pointer-events-none bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
            : "bg-[#7167FF] text-white hover:bg-[#5f56e6]"
        }`}
      >
        <span>Details</span>
        <svg
          className="w-3 h-3"
          fill="currentColor"
          viewBox="0 0 492.004 492.004"
        >
          <path d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136 c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002 v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864 c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872 l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z" />
        </svg>
      </Link>
    </div>
  );
}
