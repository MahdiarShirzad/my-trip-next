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

  return (
    <div className="px-5 pt-5 pb-4">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="font-interBold text-2xl leading-none text-[#2b2860] dark:text-white">
            {availableRooms}
          </p>
          <p className="font-inter text-xs mt-1 text-slate-400">rooms open</p>
        </div>

        <div className="flex-1 flex flex-col items-center px-3">
          <span className="font-inter text-[10px] mb-1 text-slate-400 dark:text-slate-500">
            of {totalRooms} total
          </span>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-600">
            <div
              className="h-full bg-[#7167FF] rounded-full"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <div className="text-right">
          <p className="font-interBold text-2xl leading-none text-[#2b2860] dark:text-white">
            {totalRooms}
          </p>
          <p className="font-inter text-xs mt-1 text-slate-400">room types</p>
        </div>
      </div>
    </div>
  );
}
