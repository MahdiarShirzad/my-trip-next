export default function FlightCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full animate-pulse flex-col rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-800"
    >
      {/* airline + status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-2.5 w-14 rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* route */}
      <div className="mt-6 flex items-center justify-between gap-2">
        <div className="space-y-2">
          <div className="h-6 w-12 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-2.5 w-14 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mx-2 h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-2 text-right">
          <div className="ml-auto h-6 w-12 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="ml-auto h-2.5 w-14 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* departure / arrival */}
      <div className="mt-5 h-14 rounded-xl bg-slate-100 dark:bg-slate-700/40" />

      {/* price + seats */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/60">
        <div className="space-y-2">
          <div className="h-2.5 w-8 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-5 w-14 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="mt-4 h-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}
