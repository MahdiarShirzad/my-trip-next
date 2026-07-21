"use client";

import { useEffect, useState, useCallback } from "react";
import { Eye, CalendarCheck } from "lucide-react";
import Pagination from "../_components/Pagination";
import Badge from "../_components/Badge";
import BookingDetailModal from "./_components/BookingDetailModal";
import { api, buildQuery } from "../_lib/api";
import { Booking, Paginated } from "../_lib/types";

const LIMIT = 10;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selected, setSelected] = useState<Booking | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = buildQuery({
        page,
        limit: LIMIT,
        sort: "-createdAt",
        bookingType: type || undefined,
        status: status || undefined,
        "createdAt[gte]": from || undefined,
        "createdAt[lte]": to || undefined,
      });
      const res = await api.get<Paginated<Booking>>(`/bookings${query}`);
      setBookings(res.data);
      setTotal(res.total);
    } catch {
      setError("Failed to fetch bookings list");
    } finally {
      setLoading(false);
    }
  }, [page, type, status, from, to]);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.max(Math.ceil(total / LIMIT), 1);
  const selectClass =
    "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
          className={selectClass}
          style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
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
          className={selectClass}
          style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
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
          className={selectClass}
          style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
        />
        <span className="text-slate-400 text-sm">to</span>
        <input
          type="date"
          value={to}
          onChange={(e) => {
            setPage(1);
            setTo(e.target.value);
          }}
          className={selectClass}
          style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-4 py-3">
          {error}
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
              {loading ? (
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
                      className="border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        {b.referenceNumber}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {user?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {b.bookingType === "flight" ? "Flight" : "Hotel"}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {b.totalPrice.toLocaleString()} USD
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
                          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60"
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
        onUpdated={load}
      />
    </div>
  );
}
