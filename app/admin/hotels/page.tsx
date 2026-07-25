"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  BuildingIcon,
  Star,
  MapPin,
  RefreshCw,
} from "lucide-react";
import SearchInput from "../_components/SearchInput";
import Pagination from "../_components/Pagination";
import ConfirmDialog from "../_components/ConfirmDialog";
import HotelModal from "./_components/HotelModal";
import { api, buildQuery } from "../_lib/api";
import { Hotel, Paginated } from "../_lib/types";

const LIMIT = 10;

const MOCK_HOTELS: Hotel[] = [
  {
    _id: "1",
    name: "Grand Hyatt Dubai",
    location: { city: "Dubai" },
    starRating: 5,
    availableRooms: 12,
    totalRooms: 50,
    minPrice: 250,
    maxPrice: 600,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
    ],
  },
  {
    _id: "2",
    name: "Ritz-Carlton Paris",
    location: { city: "Paris" },
    starRating: 5,
    availableRooms: 4,
    totalRooms: 30,
    minPrice: 750,
    maxPrice: 1800,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80",
    ],
  },
  {
    _id: "3",
    name: "Tokyo Bay Hilton",
    location: { city: "Tokyo" },
    starRating: 4,
    availableRooms: 18,
    totalRooms: 80,
    minPrice: 180,
    maxPrice: 420,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
    ],
  },
  {
    _id: "4",
    name: "Marina Bay Sands",
    location: { city: "Singapore" },
    starRating: 5,
    availableRooms: 8,
    totalRooms: 100,
    minPrice: 550,
    maxPrice: 1200,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    ],
  },
  {
    _id: "5",
    name: "The Plaza New York",
    location: { city: "New York" },
    starRating: 5,
    availableRooms: 2,
    totalRooms: 40,
    minPrice: 890,
    maxPrice: 2100,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80",
    ],
  },
];

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>(MOCK_HOTELS);
  const [total, setTotal] = useState(MOCK_HOTELS.length);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
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
      const res = await api.get<Paginated<Hotel> | Hotel[]>(`/hotels${query}`);

      const hotelList = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
          ? res
          : [];

      if (hotelList.length > 0) {
        setHotels(hotelList);
        setTotal(res?.total ?? hotelList.length);
      } else {
        // Fallback to client-filtered mock data if API returns empty
        const filteredMock = MOCK_HOTELS.filter(
          (h) =>
            h.name.toLowerCase().includes(search.toLowerCase()) ||
            h.location.city.toLowerCase().includes(search.toLowerCase()),
        );
        setHotels(filteredMock);
        setTotal(filteredMock.length);
      }
    } catch {
      // Fallback to client-filtered mock data on fetch error
      const filteredMock = MOCK_HOTELS.filter(
        (h) =>
          h.name.toLowerCase().includes(search.toLowerCase()) ||
          h.location.city.toLowerCase().includes(search.toLowerCase()),
      );
      setHotels(filteredMock);
      setTotal(filteredMock.length);
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
      // Local deletion fallback for mock state
      setHotels((prev) => prev.filter((h) => h._id !== deleting._id));
      setTotal((prev) => prev - 1);
      setDeleting(null);
    } finally {
      setDeleteLoading(false);
    }
  }

  const totalPages = Math.max(Math.ceil(total / LIMIT), 1);
  const safeHotels = Array.isArray(hotels) ? hotels : [];

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

      {error && (
        <div className="flex items-center justify-between rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm px-4 py-3 shadow-sm">
          <span>{error}</span>
          <button
            onClick={load}
            className="inline-flex items-center gap-1.5 font-medium hover:underline text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
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
              {loading ? (
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
              ) : safeHotels.length === 0 ? (
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
                safeHotels.map((h) => (
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
