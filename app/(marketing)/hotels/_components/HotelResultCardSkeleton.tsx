export default function HotelResultCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="h-28 w-full shrink-0 rounded-2xl bg-slate-200 sm:h-24 sm:w-36 dark:bg-slate-800" />
        <div className="space-y-3">
          <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5 sm:mt-0 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0 dark:border-slate-800">
        <div className="space-y-2 text-left sm:text-right">
          <div className="h-7 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mt-3 h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
