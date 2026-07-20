"use client";

import { Room } from "../hotel";
import { RoomType } from "../types-hotel";

interface RoomMapProps {
  rooms: Room[];
  selectedRoom: string | null;
  onSelect: (roomNumber: string) => void;
}

const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  single: "Single Room",
  double: "Double Room",
  suite: "Suite",
  deluxe: "Deluxe",
};

const ROOM_TYPE_ORDER: RoomType[] = ["deluxe", "suite", "double", "single"];

export default function RoomMap({
  rooms,
  selectedRoom,
  onSelect,
}: RoomMapProps) {
  return (
    <div className="flex flex-col gap-7">
      {/* Rooms grid */}
      <div className="space-y-7">
        {ROOM_TYPE_ORDER.map((roomType) => {
          const typeRooms = rooms.filter((r) => r.roomType === roomType);
          if (typeRooms.length === 0) return null;

          const availableCount = typeRooms.filter((r) => r.isAvailable).length;

          return (
            <div key={roomType}>
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BedIcon roomType={roomType} />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {ROOM_TYPE_LABELS[roomType]}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {availableCount} of {typeRooms.length} available
                </span>
              </div>

              <div
                role="group"
                aria-label={`${ROOM_TYPE_LABELS[roomType]} options`}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              >
                {typeRooms.map((room) => (
                  <RoomButton
                    key={room.roomNumber}
                    room={room}
                    isSelected={selectedRoom === room.roomNumber}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-slate-50 px-5 py-3.5 text-xs font-semibold text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-md border-2 border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900" />
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-md bg-[#7167FF]">
            <CheckIcon className="h-2.5 w-2.5 text-white" />
          </span>
          Selected
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-md bg-[repeating-linear-gradient(45deg,theme(colors.slate.300),theme(colors.slate.300)_2px,transparent_2px,transparent_5px)] dark:bg-[repeating-linear-gradient(45deg,theme(colors.slate.600),theme(colors.slate.600)_2px,transparent_2px,transparent_5px)]" />
          Booked
        </span>
      </div>
    </div>
  );
}

interface RoomButtonProps {
  room: Room;
  isSelected: boolean;
  onSelect: (roomNumber: string) => void;
}

function RoomButton({ room, isSelected, onSelect }: RoomButtonProps) {
  const unavailable = !room.isAvailable;

  return (
    <button
      type="button"
      disabled={unavailable}
      onClick={() => onSelect(room.roomNumber)}
      title={
        unavailable
          ? `Room ${room.roomNumber} — booked`
          : `Room ${room.roomNumber} — $${room.price.toLocaleString()}`
      }
      aria-pressed={isSelected}
      aria-label={`Room ${room.roomNumber}, sleeps ${room.capacity}, ${
        unavailable
          ? "unavailable"
          : `$${room.price.toLocaleString()} per night`
      }`}
      className={`group relative flex flex-col items-start gap-2.5 rounded-xl border-2 p-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
        unavailable
          ? "cursor-not-allowed border-slate-200 bg-[repeating-linear-gradient(45deg,theme(colors.slate.50),theme(colors.slate.50)_6px,theme(colors.slate.100)_6px,theme(colors.slate.100)_12px)] text-slate-400 dark:border-slate-800 dark:bg-[repeating-linear-gradient(45deg,theme(colors.slate.900),theme(colors.slate.900)_6px,theme(colors.slate.800)_6px,theme(colors.slate.800)_12px)] dark:text-slate-600"
          : isSelected
            ? "border-[#7167FF] bg-[#7167FF] text-white shadow-md shadow-[#7167FF]/30"
            : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#7167FF]/60 hover:shadow-sm active:translate-y-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#7167FF]/60"
      }`}
    >
      {isSelected && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-[#7167FF]">
          <CheckIcon className="h-3 w-3 text-[#7167FF]" />
        </span>
      )}

      <span className="text-sm font-extrabold">{room.roomNumber}</span>

      <span
        className={`flex items-center gap-1 text-[11px] font-semibold ${
          isSelected
            ? "text-white/80"
            : unavailable
              ? "text-slate-400 dark:text-slate-600"
              : "text-slate-400 dark:text-slate-500"
        }`}
      >
        <UsersIcon className="h-3 w-3" />
        {room.capacity} guests
      </span>

      <span
        className={`text-[13px] font-bold ${
          isSelected
            ? "text-white"
            : unavailable
              ? "text-slate-400 dark:text-slate-600"
              : "text-slate-900 dark:text-white"
        }`}
      >
        {unavailable ? "Booked" : `$${room.price.toLocaleString()}`}
      </span>
    </button>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function UsersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M15 8a3 3 0 11-6 0 3 3 0 016 0zM23 20v-1a4 4 0 00-3-3.87M16 4.13a4 4 0 010 7.75"
      />
    </svg>
  );
}

function BedIcon({ roomType }: { roomType: RoomType }) {
  // Deluxe & suite get a filled accent treatment to signal a premium tier
  const isPremium = roomType === "deluxe" || roomType === "suite";
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${isPremium ? "text-[#7167FF]" : "text-slate-400 dark:text-slate-500"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6M3 18v2M3 18h18M21 18v2M5 10V7a2 2 0 012-2h4a2 2 0 012 2v3"
      />
    </svg>
  );
}
