"use client";

import { Plus, Trash2 } from "lucide-react";
import { Room } from "../../_lib/types";

const ROOM_TYPES: Room["roomType"][] = ["single", "double", "suite", "deluxe"];
const ROOM_TYPE_LABELS: Record<Room["roomType"], string> = {
  single: "Single",
  double: "Double",
  suite: "Suite",
  deluxe: "Deluxe",
};

export default function RoomsEditor({
  rooms,
  onChange,
}: {
  rooms: Room[];
  onChange: (rooms: Room[]) => void;
}) {
  function updateRoom(index: number, patch: Partial<Room>) {
    onChange(rooms.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  function addRoom() {
    onChange([
      ...rooms,
      {
        roomNumber: "",
        roomType: "double",
        capacity: 2,
        price: 0,
        amenities: [],
        images: [],
        description: "",
        isAvailable: true,
      },
    ]);
  }

  function removeRoom(index: number) {
    onChange(rooms.filter((_, i) => i !== index));
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-2.5 py-1.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent";

  return (
    <div className="space-y-3">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <input
              required
              placeholder="Room Number"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={room.roomNumber}
              onChange={(e) =>
                updateRoom(index, { roomNumber: e.target.value })
              }
            />
            <select
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={room.roomType}
              onChange={(e) =>
                updateRoom(index, {
                  roomType: e.target.value as Room["roomType"],
                })
              }
            >
              {ROOM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ROOM_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              max={6}
              placeholder="Capacity"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={room.capacity}
              onChange={(e) =>
                updateRoom(index, { capacity: Number(e.target.value) })
              }
            />
            <input
              type="number"
              min={0}
              placeholder="Price per night"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={room.price}
              onChange={(e) =>
                updateRoom(index, { price: Number(e.target.value) })
              }
            />
          </div>
          <textarea
            placeholder="Room Description"
            className={inputClass}
            style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
            rows={2}
            value={room.description}
            onChange={(e) => updateRoom(index, { description: e.target.value })}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <input
                type="checkbox"
                checked={room.isAvailable}
                onChange={(e) =>
                  updateRoom(index, { isAvailable: e.target.checked })
                }
              />
              Available for booking
            </label>
            <button
              type="button"
              onClick={() => removeRoom(index)}
              className="text-rose-500 text-xs flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove Room
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRoom}
        className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
        style={{ color: "#7167FF" }}
      >
        <Plus className="w-4 h-4" />
        Add Room
      </button>
    </div>
  );
}
