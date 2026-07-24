const FlightResultCardSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse sm:flex-row">
      {/* Airline Skeleton */}
      <div className="flex shrink-0 flex-row items-center justify-between gap-3 border-b border-slate-100 p-6 sm:w-[240px] sm:flex-col sm:items-start sm:justify-center sm:border-b-0 dark:border-slate-800">
        <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-0">
          <div className="h-11 w-11 rounded-2xl bg-slate-200 dark:bg-slate-800 sm:mb-3" />
          <div className="space-y-1.5">
            <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="space-y-1.5 text-right sm:mt-4 sm:text-left">
          <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Route Skeleton */}
      <div className="flex flex-1 flex-col justify-center gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:pl-10">
        <div className="flex flex-1 items-center gap-6">
          <div className="space-y-2">
            <div className="h-8 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="flex flex-1 flex-col items-center px-2">
            <div className="mb-2 h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-800" />
            <div className="mt-2 h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="space-y-2 text-right">
            <div className="ml-auto h-8 w-16 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="ml-auto h-4 w-12 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="flex shrink-0 flex-row items-center justify-between gap-5 border-t border-slate-100 pt-5 sm:flex-col sm:items-end sm:border-t-0 sm:border-l sm:border-dashed sm:border-slate-200 sm:pl-8 sm:pt-0 dark:border-slate-800">
          <div className="space-y-2 text-left sm:text-right">
            <div className="h-7 w-20 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-11 w-32 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default FlightResultCardSkeleton;
