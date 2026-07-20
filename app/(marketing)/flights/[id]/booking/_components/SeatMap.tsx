"use client";

import { Seat, SeatClass } from "@/types/flight-booking";

interface SeatMapProps {
  seats: Seat[];
  selectedSeat: string | null;
  onSelect: (seatNumber: string) => void;
}

const CLASS_LABELS: Record<SeatClass, string> = {
  first: "First Class",
  business: "Business Class",
  economy: "Economy Class",
};

const CLASS_ORDER: SeatClass[] = ["first", "business", "economy"];

function parseSeat(seatNumber: string) {
  const match = seatNumber.match(/^(\d+)([A-Za-z]?)$/);
  if (!match) return { row: seatNumber, col: "" };
  return { row: match[1], col: match[2].toUpperCase() };
}

function groupByRow(seats: Seat[]) {
  const rows = new Map<string, Seat[]>();
  for (const seat of seats) {
    const { row } = parseSeat(seat.seatNumber);
    if (!rows.has(row)) rows.set(row, []);
    rows.get(row)!.push(seat);
  }
  return Array.from(rows.entries()).sort(
    ([a], [b]) => Number(a) - Number(b),
  );
}

export default function SeatMap({
  seats,
  selectedSeat,
  onSelect,
}: SeatMapProps) {
  return (
    <div className="space-y-8">
      {CLASS_ORDER.map((seatClass) => {
        const classSeats = seats.filter((s) => s.class === seatClass);
        if (classSeats.length === 0) return null;

        return (
          <div key={seatClass}>
            <p className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
              {CLASS_LABELS[seatClass]}
            </p>
            <div className="space-y-2">
              {groupByRow(classSeats).map(([row, rowSeats]) => (
                <div
                  key={row}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="w-6 shrink-0 text-right text-xs font-semibold text-slate-400 dark:text-slate-500">
                    {row}
                  </span>
                  {rowSeats
                    .sort((a, b) =>
                      parseSeat(a.seatNumber).col.localeCompare(
                        parseSeat(b.seatNumber).col,
                      ),
                    )
                    .map((seat, i) => {
                      const isSelected = selectedSeat === seat.seatNumber;
                      const { col } = parseSeat(seat.seatNumber);
                      // Aisle gap after the 2nd seat in each row, purely visual.
                      const addAisle = i === 1 && rowSeats.length > 2;

                      return (
                        <div key={seat.seatNumber} className="flex gap-2">
                          <button
                            type="button"
                            disabled={seat.isBooked}
                            onClick={() => onSelect(seat.seatNumber)}
                            title={`Seat ${seat.seatNumber} — $${seat.price}`}
                            aria-pressed={isSelected}
                            aria-label={`Seat ${seat.seatNumber}, ${seat.isBooked ? "unavailable" : `$${seat.price}`}`}
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold transition-all duration-150 ${
                              seat.isBooked
                                ? "cursor-not-allowed bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600"
                                : isSelected
                                  ? "bg-[#7167FF] text-white shadow-md shadow-[#7167FF]/30"
                                  : "bg-slate-50 text-slate-500 hover:bg-[#7167FF]/10 hover:text-[#7167FF] dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-[#7167FF]/10"
                            }`}
                          >
                            {col}
                          </button>
                          {addAisle && <span className="w-3" />}
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="flex flex-wrap items-center justify-center gap-5 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-slate-50 dark:bg-slate-800" />
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-[#7167FF]" />
          Selected
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-slate-100 dark:bg-slate-800/60" />
          Booked
        </span>
      </div>
    </div>
  );
}
