"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, BuildingIcon, Star, MapPin } from "lucide-react";
import SearchInput from "../_components/SearchInput";
import Pagination from "../_components/Pagination";
import ConfirmDialog from "../_components/ConfirmDialog";
import HotelModal from "./_components/HotelModal";
import { useDeleteHotel, useHotels } from "../_lib/queries/useHotels";
import { useDebouncedValue } from "../_lib/useDebouncedValue";
import { Hotel } from "../_lib/types";

const LIMIT = 10;

export default function HotelsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);

  const { data, isLoading, isError } = useHotels({
    page,
    limit: LIMIT,
    search: debouncedSearch,
  });
  const deleteHotel = useDeleteHotel();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [deleting, setDeleting] = useState<Hotel | null>(null);

  const hotels = data?.hotels ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(data?.totalPages ?? 1, 1);

  async function handleDelete() {
    if (!deleting) return;
    try {
      await deleteHotel.mutateAsync(deleting._id);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm">
        <div className="w-full sm:w-80">
          <SearchInput
            value={search}
            onChange={(v) => {
              setPage(1);
              setSearch(v);
            }}
            placeholder="Search by name or city..."
          />
        </div>
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#7167FF]/20 hover:shadow-[#7167FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
          style={{ backgroundColor: "#7167FF" }}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add Hotel
        </button>
      </div>

      {isError && (
        <div className="flex items-center justify-between rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm px-4 py-3 shadow-sm">
          <span>Failed to load hotels. Please try again.</span>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                <th className="px-5 py-4">Hotel</th>
                <th className="px-5 py-4">City</th>
                <th className="px-5 py-4">Stars</th>
                <th className="px-5 py-4">Rooms</th>
                <th className="px-5 py-4">Price Range</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg ml-auto" />
                    </td>
                  </tr>
                ))
              ) : hotels.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-400">
                        <BuildingIcon className="w-8 h-8 stroke-[1.5]" />
                      </div>
                      <p className="font-semibold text-slate-700 dark:text-slate-300 mt-2">
                        No hotels found
                      </p>
                      <p className="text-xs text-slate-400">
                        Try adjusting your search criteria or add a new hotel.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                hotels.map((h) => (
                  <tr
                    key={h._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        {h?.images?.[0] ? (
                          <img
                            src={h.images[0]}
                            alt=""
                            className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-800 group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-[#7167FF] flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-500/20">
                            <BuildingIcon className="w-5 h-5 stroke-[1.75]" />
                          </div>
                        )}
                        <span className="font-semibold text-slate-900 dark:text-white group-hover:text-[#7167FF] transition-colors">
                          {h?.name ?? "Untitled Hotel"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {h?.location?.city ?? "N/A"}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {h?.starRating ?? 0}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {h?.availableRooms ?? 0}{" "}
                          <span className="text-xs text-slate-400 font-normal">
                            avail.
                          </span>
                        </span>
                        <span className="text-xs text-slate-400">
                          out of {h?.totalRooms ?? 0} total
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        ${(h?.minPrice ?? 0).toLocaleString("en-US")}
                      </span>
                      <span className="text-xs text-slate-400 mx-1">-</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        ${(h?.maxPrice ?? 0).toLocaleString("en-US")}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-90 group-hover:opacity-100">
                        <button
                          onClick={() => {
                            setEditing(h);
                            setModalOpen(true);
                          }}
                          className="p-2 rounded-xl text-slate-500 hover:text-[#7167FF] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(h)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
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

      <HotelModal
        open={modalOpen}
        hotel={editing}
        onClose={() => setModalOpen(false)}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete Hotel"
        description={`Are you sure you want to delete hotel "${deleting?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Hotel"
        loading={deleteHotel.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
