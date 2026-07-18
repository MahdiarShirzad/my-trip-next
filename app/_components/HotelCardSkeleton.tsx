import TicketDivider from "./TicketDivider";

export default function HotelCardSkeleton() {
  const pulse = "bg-slate-200 dark:bg-slate-700";

  return (
    <div className="w-[305px] rounded-2xl overflow-hidden animate-pulse bg-white shadow-md shadow-slate-100 dark:bg-slate-800 dark:shadow-none">
      {/* Image */}
      <div className={`w-full h-[160px] ${pulse}`} />

      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4 gap-2">
        <div className="space-y-2 min-w-0 flex-1">
          <div className={`h-4 w-32 rounded ${pulse}`} />
          <div className={`h-3 w-16 rounded ${pulse}`} />
        </div>
        <div className={`h-6 w-12 rounded-lg shrink-0 ${pulse}`} />
      </div>

      {/* Availability strip */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className={`h-7 w-8 rounded ${pulse}`} />
            <div className={`h-3 w-14 rounded ${pulse}`} />
          </div>
          <div className="flex-1 flex flex-col items-center px-3 gap-2">
            <div className={`h-2.5 w-16 rounded ${pulse}`} />
            <div className={`h-1.5 w-full rounded-full ${pulse}`} />
          </div>
          <div className="space-y-2">
            <div className={`h-7 w-8 rounded ${pulse}`} />
            <div className={`h-3 w-14 rounded ${pulse}`} />
          </div>
        </div>
      </div>

      <TicketDivider />

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="space-y-2">
          <div className={`h-3 w-14 rounded ${pulse}`} />
          <div className={`h-6 w-20 rounded ${pulse}`} />
        </div>
        <div className={`h-10 w-24 rounded-xl ${pulse}`} />
      </div>
    </div>
  );
}
