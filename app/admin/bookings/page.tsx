"use client";

import { useState } from "react";
import { Eye, CalendarCheck } from "lucide-react";
import Pagination from "../_components/Pagination";
import Badge from "../_components/Badge";
import BookingDetailModal from "./_components/BookingDetailModal";
import { useBookings } from "../_lib/queries/useBookings";
import { Booking } from "../_lib/types";

const LIMIT = 10;
const SELECT_CLASS =
  "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent";
const FOCUS_STYLE = { "--tw-ring-color": "#7167FF" } as React.CSSProperties;

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selected, setSelected] = useState<Booking | null>(null);

  const { data, isLoading, isError } = useBookings({
    page,
    limit: LIMIT,
    bookingType: type,
    status,
    from,
    to,
  });

  const bookings = data?.bookings ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
          className={SELECT_CLASS}
          style={FOCUS_STYLE}
        >
          <option value="">All Booking Types</option>
          <option value="flight">Flight</option>
          <option value="hotel">Hotel</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className={SELECT_CLASS}
          style={FOCUS_STYLE}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={from}
          onChange={(e) => {
            setPage(1);
            setFrom(e.target.value);
          }}
          className={SELECT_CLASS}
          style={FOCUS_STYLE}
        />
        <span className="text-slate-400 text-sm">to</span>
        <input
          type="date"
          value={to}
          onChange={(e) => {
            setPage(1);
            setTo(e.target.value);
          }}
          className={SELECT_CLASS}
          style={FOCUS_STYLE}
        />
      </div>

      {isError && (
        <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-4 py-3">
          Failed to fetch bookings list
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="text-left font-medium px-4 py-3">
                  Reference No.
                </th>
                <th className="text-left font-medium px-4 py-3">User</th>
                <th className="text-left font-medium px-4 py-3">Type</th>
                <th className="text-left font-medium px-4 py-3">Total Price</th>
                <th className="text-left font-medium px-4 py-3">
                  Booking Status
                </th>
                <th className="text-left font-medium px-4 py-3">
                  Payment Status
                </th>
                <th className="text-left font-medium px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    <CalendarCheck className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const user = typeof b.user === "string" ? null : b.user;
                  return (
                    <tr
                      key={b._id}
                      className="border-b border-slate-100 dark:border-slate-800/60 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        {b.referenceNumber}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {user?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 capitalize">
                        {b.bookingType}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {b.totalPrice?.toLocaleString() ?? "0"} USD
                      </td>
                      <td className="px-4 py-3">
                        <Badge value={b.status} />
                      </td>
                      <td className="px-4 py-3">
                        <Badge value={b.paymentStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(b)}
                          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                          aria-label="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={LIMIT}
          onChange={setPage}
        />
      </div>

      <BookingDetailModal
        open={Boolean(selected)}
        booking={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
