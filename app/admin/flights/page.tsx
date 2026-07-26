"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Plane } from "lucide-react";
import SearchInput from "../_components/SearchInput";
import Pagination from "../_components/Pagination";
import Badge from "../_components/Badge";
import ConfirmDialog from "../_components/ConfirmDialog";
import FlightModal from "./_components/FlightModal";
import { useDeleteFlight, useFlights } from "../_lib/queries/useFlights";
import { useDebouncedValue } from "../_lib/useDebouncedValue";
import { Flight } from "../_lib/types";

const LIMIT = 10;

export default function FlightsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isError } = useFlights({
    page,
    limit: LIMIT,
    search: debouncedSearch,
  });
  const deleteFlight = useDeleteFlight();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Flight | null>(null);
  const [deleting, setDeleting] = useState<Flight | null>(null);

  const flights = data?.flights ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  async function handleDelete() {
    if (!deleting) return;
    try {
      await deleteFlight.mutateAsync(deleting._id);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7167FF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5b51e6]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Flight</span>
        </button>
      </div>

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          Failed to load flights. Please try again.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 font-mono text-xs uppercase tracking-[0.15em] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="px-6 py-4 font-semibold">Flight</th>
                <th className="px-6 py-4 font-semibold">Route</th>
                <th className="px-6 py-4 font-semibold">Departure Time</th>
                <th className="px-6 py-4 font-semibold">Seats</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-[#7167FF]" />
                    </div>
                  </td>
                </tr>
              ) : flights.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-400 dark:text-slate-500"
                  >
                    <Plane className="mx-auto mb-2 h-6 w-6 opacity-40" />
                    <span>No flights found</span>
                  </td>
                </tr>
              ) : (
                flights.map((f) => (
                  <tr
                    key={f._id}
                    className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {f.airline}
                      </p>
                      <p className="font-mono text-xs text-slate-400 dark:text-slate-500">
                        {f.flightNumber}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {f.origin?.city} ({f.origin?.code}) →{" "}
                      {f.destination?.city} ({f.destination?.code})
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                      {new Date(f.departureTime).toLocaleString("en-US")}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                      {f.availableSeats} / {f.totalSeats}
                    </td>
                    <td className="px-6 py-4">
                      <Badge value={f.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(f);
                            setModalOpen(true);
                          }}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(f)}
                          className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
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
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete Flight"
        description={`Are you sure you want to delete flight ${deleting?.flightNumber ?? ""}? This action cannot be undone.`}
        confirmLabel="Delete Flight"
        loading={deleteFlight.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
