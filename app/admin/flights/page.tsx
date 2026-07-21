"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Plane } from "lucide-react";
import SearchInput from "../_components/SearchInput";
import Pagination from "../_components/Pagination";
import Badge from "../_components/Badge";
import ConfirmDialog from "../_components/ConfirmDialog";
import FlightModal from "./_components/FlightModal";
import { api, buildQuery } from "../_lib/api";
import { Flight, Paginated } from "../_lib/types";

const LIMIT = 10;

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Flight | null>(null);
  const [deleting, setDeleting] = useState<Flight | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = buildQuery({
        page,
        limit: LIMIT,
        sort: "-departureTime",
        // ApiFeatures-style loose search on origin/destination city or flight number
        keyword: search || undefined,
      });
      const res = await api.get<Paginated<Flight>>(`/flights${query}`);
      setFlights(res.data);
      setTotal(res.total);
    } catch {
      setError("Failed to fetch flights list");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await api.delete(`/flights/${deleting._id}`);
      setDeleting(null);
      load();
    } catch {
      setError("Failed to delete flight");
    } finally {
      setDeleteLoading(false);
    }
  }

  const totalPages = Math.max(Math.ceil(total / LIMIT), 1);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <SearchInput
          value={search}
          onChange={(v) => {
            setPage(1);
            setSearch(v);
          }}
          placeholder="Search by city or flight number..."
        />
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg text-white text-sm font-medium px-4 py-2"
          style={{ backgroundColor: "#7167FF" }}
        >
          <Plus className="w-4 h-4" />
          Add Flight
        </button>
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
                <th className="text-left font-medium px-4 py-3">Flight</th>
                <th className="text-left font-medium px-4 py-3">Route</th>
                <th className="text-left font-medium px-4 py-3">
                  Departure Time
                </th>
                <th className="text-left font-medium px-4 py-3">
                  Seats (Available/Total)
                </th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : flights.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    <Plane className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No flights found
                  </td>
                </tr>
              ) : (
                flights.map((f) => (
                  <tr
                    key={f._id}
                    className="border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {f.airline}
                      </p>
                      <p className="text-xs text-slate-400">{f.flightNumber}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {f.origin.city} ({f.origin.code}) → {f.destination.city} (
                      {f.destination.code})
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {new Date(f.departureTime).toLocaleString("en-US")}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {f.availableSeats} / {f.totalSeats}
                    </td>
                    <td className="px-4 py-3">
                      <Badge value={f.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(f);
                            setModalOpen(true);
                          }}
                          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(f)}
                          className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

      <FlightModal
        open={modalOpen}
        flight={editing}
        onClose={() => setModalOpen(false)}
        onSaved={load}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete Flight"
        description={`Are you sure you want to delete flight ${deleting?.flightNumber ?? ""}? This action cannot be undone.`}
        confirmLabel="Delete Flight"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
