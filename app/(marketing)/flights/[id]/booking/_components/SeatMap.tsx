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

const classStyles = {
  first: {
    label: "F",
    name: "First Class",
    base: "bg-amber-500/10 border-amber-500/40 text-amber-300",
    hover: "hover:bg-amber-500/20 hover:border-amber-400",
    selected: "bg-amber-200 border-amber-400 text-slate-950",
    ring: "ring-amber-400",
  },
  business: {
    label: "B",
    name: "Business Class",
    base: "bg-sky-500/10 border-sky-500/40 text-sky-300",
    hover: "hover:bg-sky-500/20 hover:border-sky-400",
    selected: "bg-sky-200 border-sky-400 text-slate-950",
    ring: "ring-sky-400",
  },
  economy: {
    label: "E",
    name: "Economy Class",
    base: "bg-[#7167FF]/10 border-[#7167FF]/40 text-[#a29bff]",
    hover: "hover:bg-[#7167FF]/20 hover:border-[#7167FF]",
    selected: "bg-[#7167FF] border-[#7167FF] text-white",
    ring: "ring-[#7167FF]",
  },
};

export default function SeatMap({
  seats,
  selectedSeat,
  onSelect,
}: SeatMapProps) {
  const rowsData = groupByRow(seats);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 dark:bg-white/[0.02] bg-gray-400/4 p-5 sm:p-6">
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <div className="w-6 shrink-0" />
          <span className="w-10 text-center">A</span>
          <span className="w-10 text-center">B</span>
          <div className="w-6 shrink-0" />
          <span className="w-10 text-center">C</span>
          <span className="w-10 text-center">D</span>
        </div>

        {rowsData.map(([row, rowSeats]) => {
          const seatByCol = new Map(
            rowSeats.map((s) => [parseSeat(s.seatNumber).col, s]),
          );
          const leftCols = ["A", "B"];
          const rightCols = ["C", "D"];

          return (
            <div key={row} className="flex items-center justify-center gap-1.5">
              <span className="w-6 shrink-0 text-right text-xs font-bold text-slate-600">
                {row}
              </span>

              <div className="flex items-center gap-1.5">
                {leftCols.map((col) => (
                  <SeatSlot
                    key={col}
                    seat={seatByCol.get(col)}
                    selectedSeat={selectedSeat}
                    onSelect={onSelect}
                  />
                ))}
              </div>

              <div className="w-6 shrink-0" />

              <div className="flex items-center gap-1.5">
                {rightCols.map((col) => (
                  <SeatSlot
                    key={col}
                    seat={seatByCol.get(col)}
                    selectedSeat={selectedSeat}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex w-full max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-slate-400">
        {Object.entries(classStyles).map(([key, style]) => (
          <span key={key} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md border text-[11px] font-bold ${style.base}`}
            >
              {style.label}
            </span>
            <span>{style.name}</span>
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md border border-white/5 bg-white/5" />
          Booked
        </span>
      </div>
    </div>
  );
}

interface SeatSlotProps {
  seat: Seat | undefined;
  selectedSeat: string | null;
  onSelect: (seatNumber: string) => void;
}

function SeatSlot({ seat, selectedSeat, onSelect }: SeatSlotProps) {
  if (!seat) {
    return <div className="h-10 w-10 shrink-0" aria-hidden="true" />;
  }
  return (
    <SeatButton
      seat={seat}
      isSelected={selectedSeat === seat.seatNumber}
      onSelect={onSelect}
    />
  );
}

interface SeatButtonProps {
  seat: Seat;
  isSelected: boolean;
  onSelect: (seatNumber: string) => void;
}

function SeatButton({ seat, isSelected, onSelect }: SeatButtonProps) {
  const style =
    classStyles[seat.class as keyof typeof classStyles] || classStyles.economy;

  return (
    <button
      type="button"
      disabled={seat.isBooked}
      onClick={() => onSelect(seat.seatNumber)}
      title={`Seat ${seat.seatNumber} — ${style.name} — $${seat.price}`}
      aria-pressed={isSelected}
      aria-label={`Seat ${seat.seatNumber}, ${style.name}, ${seat.isBooked ? "unavailable" : `$${seat.price}`}`}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold transition-colors duration-150 ${
        seat.isBooked
          ? "cursor-not-allowed border-white/5 bg-white/[0.03] text-slate-700"
          : isSelected
            ? `${style.selected} ring-2 ring-offset-2 ring-offset-slate-950 ${style.ring}`
            : `${style.base} ${style.hover}`
      }`}
    >
      {seat.seatNumber}
      {!seat.isBooked && (
        <span
          className={`absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold leading-none ${
            isSelected
              ? "bg-slate-950 text-white"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          {style.label}
        </span>
      )}
    </button>
  );
}
