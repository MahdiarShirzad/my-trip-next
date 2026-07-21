"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";
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
        name: hotel.name,
        description: hotel.description,
        city: hotel.location.city,
        address: hotel.location.address,
        zipCode: hotel.location.zipCode,
        starRating: hotel.starRating,
        phone: hotel.contactInfo.phone,
        email: hotel.contactInfo.email,
        checkInTime: hotel.checkInTime,
        checkOutTime: hotel.checkOutTime,
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
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file);
      setImages((prev) => [...prev, url]);
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (rooms.length === 0)
        throw new Error("At least one room must be defined");

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
    "w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent";
  const labelClass =
    "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Hotel" : "Add New Hotel"}
      width="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-3 py-2">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Hotel Name</label>
            <input
              required
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Star Rating (1 to 5)</label>
            <input
              required
              type="number"
              min={1}
              max={5}
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
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
            rows={2}
            className={inputClass}
            style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>City</label>
            <input
              required
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Address</label>
            <input
              required
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Zip Code</label>
            <input
              required
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.zipCode}
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Check-In Time</label>
            <input
              required
              placeholder="14:00"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.checkInTime}
              onChange={(e) =>
                setForm({ ...form, checkInTime: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelClass}>Check-Out Time</label>
            <input
              required
              placeholder="12:00"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.checkOutTime}
              onChange={(e) =>
                setForm({ ...form, checkOutTime: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              required
              placeholder="+1..."
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              required
              type="email"
              className={inputClass}
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Hotel Images</label>
          <div className="flex flex-wrap gap-2">
            {images.map((url, i) => (
              <div
                key={i}
                className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="w-16 h-16 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center cursor-pointer text-slate-400 hover:border-[#7167FF] hover:text-[#7167FF]">
              {uploading ? (
                <span className="text-[10px]">...</span>
              ) : (
                <ImagePlus className="w-5 h-5" />
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

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Rooms
          </p>
          <RoomsEditor rooms={rooms} onChange={setRooms} />
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
            disabled={saving || uploading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-60"
            style={{ backgroundColor: "#7167FF" }}
          >
            {saving ? "Saving..." : "Save Hotel"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
