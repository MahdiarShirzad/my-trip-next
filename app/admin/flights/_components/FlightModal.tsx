"use client";

import { useEffect, useState, FormEvent, CSSProperties } from "react";
import Modal from "../../_components/Modal";
import { api } from "../../_lib/api";
import { Flight, Seat } from "../../_lib/types";
import { useSaveFlight } from "../../_lib/queries/useFlights";

type SeatClass = "economy" | "business" | "first";

interface ClassRow {
  count: number;
  price: number;
}

const CLASS_LABELS: Record<SeatClass, string> = {
  economy: "Economy",
  business: "Business",
  first: "First Class",
};

function seatsFromClassRows(rows: Record<SeatClass, ClassRow>): Seat[] {
  const seats: Seat[] = [];
  (Object.keys(rows) as SeatClass[]).forEach((cls) => {
    const { count, price } = rows[cls];
    for (let i = 1; i <= count; i++) {
      seats.push({
        seatNumber: `${cls[0].toUpperCase()}${i}`,
        class: cls,
        price,
        isBooked: false,
      });
    }
  });
  return seats;
}

function classRowsFromSeats(
  seats: Seat[] | undefined,
): Record<SeatClass, ClassRow> {
  const base: Record<SeatClass, ClassRow> = {
    economy: { count: 0, price: 0 },
    business: { count: 0, price: 0 },
    first: { count: 0, price: 0 },
  };
  (seats ?? []).forEach((s) => {
    if (base[s.class as SeatClass]) {
      base[s.class as SeatClass].count += 1;
      base[s.class as SeatClass].price = s.price;
    }
  });
  return base;
}

export default function FlightModal({
  open,
  onClose,
  onSaved,
  flight,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  flight: Flight | null;
}) {
  const isEdit = Boolean(flight);
  const [form, setForm] = useState(() => ({
    airline: flight?.airline ?? "",
    flightNumber: flight?.flightNumber ?? "",
    originCode: flight?.origin?.code ?? "",
    originCity: flight?.origin?.city ?? "",
    destinationCode: flight?.destination?.code ?? "",
    destinationCity: flight?.destination?.city ?? "",
    departureTime: flight?.departureTime
      ? flight.departureTime.slice(0, 16)
      : "",
    arrivalTime: flight?.arrivalTime ? flight.arrivalTime.slice(0, 16) : "",
    status: flight?.status ?? "scheduled",
  }));
  const [classRows, setClassRows] = useState<Record<SeatClass, ClassRow>>(() =>
    classRowsFromSeats(flight?.seats),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveFlight = useSaveFlight();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const seats = seatsFromClassRows(classRows);
      if (seats.length === 0)
        throw new Error("At least one seat must be defined");

      const payload = {
        airline: form.airline,
        flightNumber: form.flightNumber,
        origin: { code: form.originCode.toUpperCase(), city: form.originCity },
        destination: {
          code: form.destinationCode.toUpperCase(),
          city: form.destinationCity,
        },
        departureTime: form.departureTime,
        arrivalTime: form.arrivalTime,
        status: form.status,
        seats,
      };

      await saveFlight.mutateAsync({ id: flight?._id, payload });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save flight");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent";
  const labelClass =
    "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Flight" : "Add New Flight"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-3 py-2">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Airline</label>
            <input
              required
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.airline}
              onChange={(e) => setForm({ ...form, airline: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Flight Number</label>
            <input
              required
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.flightNumber}
              onChange={(e) =>
                setForm({ ...form, flightNumber: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Origin
            </p>
            <input
              required
              placeholder="Airport code (e.g. THR)"
              maxLength={3}
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.originCode}
              onChange={(e) => setForm({ ...form, originCode: e.target.value })}
            />
            <input
              required
              placeholder="Origin city"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.originCity}
              onChange={(e) => setForm({ ...form, originCity: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Destination
            </p>
            <input
              required
              placeholder="Airport code (e.g. DXB)"
              maxLength={3}
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.destinationCode}
              onChange={(e) =>
                setForm({ ...form, destinationCode: e.target.value })
              }
            />
            <input
              required
              placeholder="Destination city"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.destinationCity}
              onChange={(e) =>
                setForm({ ...form, destinationCity: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Departure Time</label>
            <input
              required
              type="datetime-local"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.departureTime}
              onChange={(e) =>
                setForm({ ...form, departureTime: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelClass}>Arrival Time</label>
            <input
              required
              type="datetime-local"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
              value={form.arrivalTime}
              onChange={(e) =>
                setForm({ ...form, arrivalTime: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Flight Status</label>
          <select
            className={inputClass}
            style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as Flight["status"] })
            }
          >
            <option value="scheduled">Scheduled</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Seat Capacity & Price by Class
          </p>
          <div className="space-y-2">
            {(Object.keys(classRows) as SeatClass[]).map((cls) => (
              <div key={cls} className="grid grid-cols-3 gap-2 items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {CLASS_LABELS[cls]}
                </span>
                <input
                  type="number"
                  min={0}
                  placeholder="Seat count"
                  className={inputClass}
                  style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
                  value={classRows[cls].count || ""}
                  onChange={(e) =>
                    setClassRows({
                      ...classRows,
                      [cls]: {
                        ...classRows[cls],
                        count: Math.max(0, Number(e.target.value)),
                      },
                    })
                  }
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Price"
                  className={inputClass}
                  style={{ "--tw-ring-color": "#7167FF" } as CSSProperties}
                  value={classRows[cls].price || ""}
                  onChange={(e) =>
                    setClassRows({
                      ...classRows,
                      [cls]: {
                        ...classRows[cls],
                        price: Math.max(0, Number(e.target.value)),
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
          {isEdit && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              Note: Changing seat counts will reset the booked/available status
              of current seats.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-60 transition-colors"
            style={{ backgroundColor: "#7167FF" }}
          >
            {saving ? "Saving..." : "Save Flight"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
