"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import {
  ImagePlus,
  X,
  Hotel as HotelIcon,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Bed,
} from "lucide-react";
import Modal from "../../_components/Modal";
import RoomsEditor from "./RoomsEditor";
import { api, uploadImage } from "../../_lib/api";
import { Hotel, Room } from "../../_lib/types";

const EMPTY_FORM = {
  name: "",
  description: "",
  city: "",
  address: "",
  zipCode: "",
  starRating: 3,
  phone: "",
  email: "",
  checkInTime: "14:00",
  checkOutTime: "12:00",
};

export default function HotelModal({
  open,
  onClose,
  onSaved,
  hotel,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  hotel: Hotel | null;
}) {
  const isEdit = Boolean(hotel);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState<string[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (hotel) {
      setForm({
        name: hotel.name ?? "",
        description: hotel.description ?? "",
        city: hotel.location?.city ?? "",
        address: hotel.location?.address ?? "",
        zipCode: hotel.location?.zipCode ?? "",
        starRating: hotel.starRating ?? 3,
        phone: hotel.contactInfo?.phone ?? "",
        email: hotel.contactInfo?.email ?? "",
        checkInTime: hotel.checkInTime ?? "14:00",
        checkOutTime: hotel.checkOutTime ?? "12:00",
      });
      setImages(hotel.images ?? []);
      setRooms(hotel.rooms ?? []);
    } else {
      setForm(EMPTY_FORM);
      setImages([]);
      setRooms([]);
    }
    setError(null);
  }, [open, hotel]);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = "";
    setUploading(true);
    setError(null);

    try {
      const url = await uploadImage(file);
      setImages((prev) => [...prev, url]);
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (rooms.length === 0) {
        throw new Error("At least one room must be defined");
      }

      const payload = {
        name: form.name,
        description: form.description,
        location: {
          city: form.city,
          address: form.address,
          zipCode: form.zipCode,
        },
        starRating: Number(form.starRating),
        contactInfo: { phone: form.phone, email: form.email },
        checkInTime: form.checkInTime,
        checkOutTime: form.checkOutTime,
        images,
        rooms,
      };

      if (isEdit && hotel) {
        await api.patch(`/hotels/${hotel._id}`, payload);
      } else {
        await api.post("/hotels", payload);
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save hotel");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7167FF]/30 focus:border-[#7167FF] transition-all duration-200";

  const labelClass =
    "flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Hotel Property" : "Add New Hotel Property"}
      width="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-2">
        {error && (
          <div className="rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-sm px-4 py-3 flex items-center justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#7167FF]">
            <HotelIcon className="w-4 h-4" />
            <span>General Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Hotel Name</label>
              <input
                required
                className={inputClass}
                placeholder="e.g. Grand Plaza Resort"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Star Rating
              </label>
              <input
                required
                type="number"
                min={1}
                max={5}
                className={inputClass}
                value={form.starRating}
                onChange={(e) =>
                  setForm({ ...form, starRating: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              required
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Provide a detailed description of the property and its amenities..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#7167FF]">
            <MapPin className="w-4 h-4" />
            <span>Location & Timing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>City</label>
              <input
                required
                className={inputClass}
                placeholder="City name"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Address</label>
              <input
                required
                className={inputClass}
                placeholder="Street address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Zip Code</label>
              <input
                required
                className={inputClass}
                placeholder="ZIP / Postal code"
                value={form.zipCode}
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>
                <Clock className="w-3.5 h-3.5" />
                Check-In Time
              </label>
              <input
                required
                placeholder="14:00"
                className={inputClass}
                value={form.checkInTime}
                onChange={(e) =>
                  setForm({ ...form, checkInTime: e.target.value })
                }
              />
            </div>
            <div>
              <label className={labelClass}>
                <Clock className="w-3.5 h-3.5" />
                Check-Out Time
              </label>
              <input
                required
                placeholder="12:00"
                className={inputClass}
                value={form.checkOutTime}
                onChange={(e) =>
                  setForm({ ...form, checkOutTime: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#7167FF]">
            <Phone className="w-4 h-4" />
            <span>Contact Information</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <Phone className="w-3 h-3 text-slate-400" />
                Phone Number
              </label>
              <input
                required
                placeholder="+1 234 567 890"
                className={inputClass}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>
                <Mail className="w-3 h-3 text-slate-400" />
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="contact@hotel.com"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#7167FF] flex items-center gap-2">
              <ImagePlus className="w-4 h-4" />
              <span>Hotel Gallery</span>
            </label>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {images.length} images uploaded
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div
                key={i}
                className="group relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-1 right-1 bg-black/70 hover:bg-rose-600 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#7167FF] dark:hover:border-[#7167FF] bg-white dark:bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer text-slate-400 hover:text-[#7167FF] transition-all duration-200">
              {uploading ? (
                <span className="text-xs font-medium animate-pulse">
                  Uploading...
                </span>
              ) : (
                <>
                  <ImagePlus className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#7167FF]">
            <Bed className="w-4 h-4" />
            <span>Rooms Configuration</span>
          </div>
          <RoomsEditor rooms={rooms} onChange={setRooms} />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-[#7167FF] hover:bg-[#5f54f0] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#7167FF]/25 hover:shadow-none transition-all duration-200"
          >
            {saving
              ? "Saving..."
              : isEdit
                ? "Update Property"
                : "Save Property"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
