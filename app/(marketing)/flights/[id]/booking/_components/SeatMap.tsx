"use client";

import { Seat } from "../flight-booking";

interface SeatMapProps {
  seats: Seat[];
  selectedSeat: string | null;
  onSelect: (seatNumber: string) => void;
}

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
  return Array.from(rows.entries()).sort(([a], [b]) => Number(a) - Number(b));
}

export default function SeatMap({
  seats,
  selectedSeat,
  onSelect,
}: SeatMapProps) {
  const rowsData = groupByRow(seats);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Cabin grid — rows displayed horizontally in a 2-column grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {rowsData.map(([row, rowSeats]) => {
          const sortedSeats = rowSeats.sort((a, b) =>
            parseSeat(a.seatNumber).col.localeCompare(
              parseSeat(b.seatNumber).col,
            ),
          );

          return (
            <div key={row} className="flex items-center justify-center gap-1">
              {/* Left seat (A) */}
              {sortedSeats[0] && (
                <SeatButton
                  seat={sortedSeats[0]}
                  isSelected={selectedSeat === sortedSeats[0].seatNumber}
                  onSelect={onSelect}
                />
              )}

              {/* Aisle */}
              <div className="w-8" />

              {/* Right seat (B) */}
              {sortedSeats[1] && (
                <SeatButton
                  seat={sortedSeats[1]}
                  isSelected={selectedSeat === sortedSeats[1].seatNumber}
                  onSelect={onSelect}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-white border-2 border-slate-300 dark:border-slate-600" />
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-[#7167FF]" />
          Selected
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-slate-200 dark:bg-slate-700" />
          Booked
        </span>
      </div>
    </div>
  );
}

interface SeatButtonProps {
  seat: Seat;
  isSelected: boolean;
  onSelect: (seatNumber: string) => void;
}

function SeatButton({ seat, isSelected, onSelect }: SeatButtonProps) {
  return (
    <button
      type="button"
      disabled={seat.isBooked}
      onClick={() => onSelect(seat.seatNumber)}
      title={`Seat ${seat.seatNumber} — $${seat.price}`}
      aria-pressed={isSelected}
      aria-label={`Seat ${seat.seatNumber}, ${seat.isBooked ? "unavailable" : `$${seat.price}`}`}
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold transition-all duration-150 border-2 ${
        seat.isBooked
          ? "cursor-not-allowed bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-600"
          : isSelected
            ? "bg-[#7167FF] border-[#7167FF] text-white shadow-md shadow-[#7167FF]/30"
            : "bg-white border-slate-300 text-slate-700 hover:border-[#7167FF] hover:text-[#7167FF] dark:bg-slate-900 dark:border-slate-600 dark:text-slate-300 dark:hover:border-[#7167FF]"
      }`}
    >
      {seat.seatNumber}
    </button>
  );
}
