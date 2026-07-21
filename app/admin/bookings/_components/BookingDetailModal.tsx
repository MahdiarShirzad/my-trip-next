"use client";

import { useEffect, useState } from "react";
import Modal from "../../_components/Modal";
import Badge from "../../_components/Badge";
import { api } from "../../_lib/api";
import { Booking, BookingStatus, Flight, Hotel } from "../../_lib/types";

const STATUS_OPTIONS: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function BookingDetailModal({
  open,
  onClose,
  onUpdated,
  booking,
}: {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
  booking: Booking | null;
}) {
  const [status, setStatus] = useState<BookingStatus>("pending");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (booking) setStatus(booking.status);
    setError(null);
  }, [booking]);

  if (!booking) return null;

  const user = typeof booking.user === "string" ? null : booking.user;
  const flight =
    typeof booking.flightId === "string"
      ? null
      : (booking.flightId as Flight | undefined);
  const hotel =
    typeof booking.hotelId === "string"
      ? null
      : (booking.hotelId as Hotel | undefined);

  async function handleStatusSave() {
    setSaving(true);
    setError(null);
    try {
      await api.patch(`/bookings/${booking!._id}`, { status });
      onUpdated();
      onClose();
    } catch {
      setError("Failed to update booking status");
    } finally {
      setSaving(false);
    }
  }

  const row =
    "flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0 text-sm";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Booking Details: ${booking.referenceNumber}`}
    >
      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            User Information
          </h3>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <div className={row}>
              <span className="text-slate-500 dark:text-slate-400">Name</span>
              <span className="text-slate-900 dark:text-white font-medium">
                {user?.name ?? "—"}
              </span>
            </div>
            <div className={row}>
              <span className="text-slate-500 dark:text-slate-400">Email</span>
              <span className="text-slate-900 dark:text-white">
                {user?.email ?? "—"}
              </span>
            </div>
            <div className={row}>
              <span className="text-slate-500 dark:text-slate-400">Phone</span>
              <span className="text-slate-900 dark:text-white">
                {user?.phone ?? "—"}
              </span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            {booking.bookingType === "flight"
              ? "Flight Information"
              : "Hotel Information"}
          </h3>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            {booking.bookingType === "flight" ? (
              <>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Flight
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {flight
                      ? `${flight.airline} - ${flight.flightNumber}`
                      : "—"}
                  </span>
                </div>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Route
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {flight
                      ? `${flight.origin.city} → ${flight.destination.city}`
                      : "—"}
                  </span>
                </div>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Travel Date
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {booking.travelDate
                      ? new Date(booking.travelDate).toLocaleString()
                      : "—"}
                  </span>
                </div>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Number of Passengers
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {booking.passengers?.length ?? 0}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Hotel
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {hotel?.name ?? "—"}
                  </span>
                </div>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    City
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {hotel?.location.city ?? "—"}
                  </span>
                </div>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Check-in / Check-out
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {booking.checkInDate
                      ? new Date(booking.checkInDate).toLocaleDateString()
                      : "—"}{" "}
                    to{" "}
                    {booking.checkOutDate
                      ? new Date(booking.checkOutDate).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
                <div className={row}>
                  <span className="text-slate-500 dark:text-slate-400">
                    Rooms / Guests
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    {booking.numberOfRooms ?? 0} room(s) /{" "}
                    {booking.guests?.length ?? 0} guest(s)
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Payment
          </h3>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
            <div className={row}>
              <span className="text-slate-500 dark:text-slate-400">
                Total Price
              </span>
              <span className="text-slate-900 dark:text-white font-medium">
                {booking.totalPrice.toLocaleString()} USD
              </span>
            </div>
            <div className={row}>
              <span className="text-slate-500 dark:text-slate-400">
                Payment Status
              </span>
              <Badge value={booking.paymentStatus} />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Update Booking Status
          </h3>
          {error && (
            <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-3 py-2 mb-2">
              {error}
            </div>
          )}
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <button
              onClick={handleStatusSave}
              disabled={saving || status === booking.status}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: "#7167FF" }}
            >
              {saving ? "Saving..." : "Save Status"}
            </button>
          </div>
        </section>
      </div>
    </Modal>
  );
}
