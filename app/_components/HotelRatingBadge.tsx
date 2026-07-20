export default function HotelRatingBadge({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 flex-shrink-0 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
      <svg
        className="w-3.5 h-3.5 text-amber-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.445a1 1 0 00-1.176 0l-3.367 2.445c-.783.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.063 9.385c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.958z" />
      </svg>
      <span className="font-interSemiBold text-xs text-amber-700 dark:text-amber-400">
        {rating}
      </span>
    </div>
  );
}
