export default function HotelAvailabilityStrip({
  availableRooms,
  totalRooms,
}: {
  availableRooms: number;
  totalRooms: number;
}) {
  const fillPercent = Math.round(
    (availableRooms / Math.max(totalRooms, 1)) * 100,
  );
  const isLow = availableRooms > 0 && fillPercent <= 25;
  const isSoldOut = availableRooms === 0;

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-inter text-xs text-slate-500 dark:text-slate-400">
          {isSoldOut
            ? "No rooms available"
            : isLow
              ? `Only ${availableRooms} left`
              : `${availableRooms} rooms available`}
        </span>
        <span className="font-inter text-xs text-slate-400 dark:text-slate-500">
          of {totalRooms}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <div
          className={`h-full rounded-full transition-all ${
            isSoldOut
              ? "bg-slate-300 dark:bg-slate-600"
              : isLow
                ? "bg-[#f96768]"
                : "bg-[#7167FF]"
          }`}
          style={{ width: `${isSoldOut ? 100 : fillPercent}%` }}
        />
      </div>
    </div>
  );
}
