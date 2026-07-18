export default function StarRating({ rating }: { rating: number }) {
  const stars = [0, 1, 2, 3, 4];

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {stars.map((index) => {
        const fillAmount = Math.max(0, Math.min(1, rating - index)) * 100;

        return (
          <div key={index} className="relative w-4 h-4">
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 w-4 h-4 text-slate-200 dark:text-slate-600"
              fill="currentColor"
            >
              <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z" />
            </svg>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillAmount}%` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#ffa903]"
                fill="currentColor"
              >
                <path d="M12 2.5l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.7z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
