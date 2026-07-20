"use client";

import { Room, RoomType } from "@/types/hotel-booking";

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
    <div className="flex flex-col items-center gap-6">
      {/* Rooms grid */}
      <div className="space-y-6 w-full">
        {ROOM_TYPE_ORDER.map((roomType) => {
          const typeRooms = rooms.filter((r) => r.roomType === roomType);
          if (typeRooms.length === 0) return null;

          return (
            <div key={roomType}>
              <p className="mb-4 text-sm font-bold text-slate-900 dark:text-white">
                {ROOM_TYPE_LABELS[roomType]}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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
      <div className="flex flex-wrap items-center justify-center gap-5 border-t border-slate-100 pt-4 w-full text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
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

interface RoomButtonProps {
  room: Room;
  isSelected: boolean;
  onSelect: (roomNumber: string) => void;
}

function RoomButton({ room, isSelected, onSelect }: RoomButtonProps) {
  return (
    <button
      type="button"
      disabled={!room.isAvailable}
      onClick={() => onSelect(room.roomNumber)}
      title={`Room ${room.roomNumber} — $${room.price}`}
      aria-pressed={isSelected}
      aria-label={`Room ${room.roomNumber}, ${room.isAvailable ? `$${room.price}` : "unavailable"}`}
      className={`flex flex-col items-center justify-center rounded-lg p-3 text-center transition-all duration-150 border-2 ${
        !room.isAvailable
          ? "cursor-not-allowed bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-600"
          : isSelected
            ? "bg-[#7167FF] border-[#7167FF] text-white shadow-md shadow-[#7167FF]/30"
            : "bg-white border-slate-300 text-slate-700 hover:border-[#7167FF] hover:text-[#7167FF] dark:bg-slate-900 dark:border-slate-600 dark:text-slate-300 dark:hover:border-[#7167FF]"
      }`}
    >
      <span className="text-[13px] font-bold">{room.roomNumber}</span>
      <span className="text-[11px] opacity-75 mt-1">${room.price}</span>
    </button>
  );
}
