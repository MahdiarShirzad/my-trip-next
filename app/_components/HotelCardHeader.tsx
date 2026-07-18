import HotelRatingBadge from "./HotelRatingBadge";

export default function HotelCardHeader({
  name,
  city,
  starRating,
}: {
  name: string;
  city: string;
  starRating: number;
}) {
  return (
    <div className="flex items-start justify-between px-5 pt-4 gap-2">
      <div className="min-w-0">
        <p className="font-interSemiBold text-base truncate text-[#2b2860] dark:text-white">
          {name}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <svg
            className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
            {city}
          </span>
        </div>
      </div>
      <HotelRatingBadge rating={starRating} />
    </div>
  );
}
