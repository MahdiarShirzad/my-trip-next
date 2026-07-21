"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, BuildingIcon, Star } from "lucide-react";
import SearchInput from "../_components/SearchInput";
import Pagination from "../_components/Pagination";
import ConfirmDialog from "../_components/ConfirmDialog";
import HotelModal from "./_components/HotelModal";
import { api, buildQuery } from "../_lib/api";
import { Hotel, Paginated } from "../_lib/types";

const LIMIT = 10;

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Hotel | null>(null);
  const [deleting, setDeleting] = useState<Hotel | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = buildQuery({
        page,
        limit: LIMIT,
        keyword: search || undefined,
      });
      const res = await api.get<Paginated<Hotel>>(`/hotels${query}`);
      setHotels(res.data);
      setTotal(res.total);
    } catch {
      setError("Failed to fetch hotels list");
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
      await api.delete(`/hotels/${deleting._id}`);
      setDeleting(null);
      load();
    } catch {
      setError("Failed to delete hotel");
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
          placeholder="Search by name or city..."
        />
        <button
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#7167FF" }}
        >
          <Plus className="w-4 h-4" />
          Add Hotel
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
                <th className="text-left font-medium px-4 py-3">Hotel</th>
                <th className="text-left font-medium px-4 py-3">City</th>
                <th className="text-left font-medium px-4 py-3">Stars</th>
                <th className="text-left font-medium px-4 py-3">
                  Rooms (Available/Total)
                </th>
                <th className="text-left font-medium px-4 py-3">Price Range</th>
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
              ) : hotels.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-slate-400"
                  >
                    <BuildingIcon className="w-6 h-6 mx-auto mb-2 opacity-50" />
                    No hotels found
                  </td>
                </tr>
              ) : (
                hotels.map((h) => (
                  <tr
                    key={h._id}
                    className="border-b border-slate-100 dark:border-slate-800/60 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {h.images?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={h.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                            <BuildingIcon className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                        <span className="font-medium text-slate-900 dark:text-white">
                          {h.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {h.location.city}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {h.starRating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {h.availableRooms} / {h.totalRooms}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {h.minPrice.toLocaleString("en-US")} -{" "}
                      {h.maxPrice.toLocaleString("en-US")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditing(h);
                            setModalOpen(true);
                          }}
                          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(h)}
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

      <HotelModal
        open={modalOpen}
        hotel={editing}
        onClose={() => setModalOpen(false)}
        onSaved={load}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete Hotel"
        description={`Are you sure you want to delete hotel "${deleting?.name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Hotel"
        loading={deleteLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
