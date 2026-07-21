"use client";

import { useEffect, useState } from "react";
import Modal from "../../_components/Modal";
import Badge from "../../_components/Badge";
import { api, buildQuery } from "../../_lib/api";
import { AdminUser, Booking, Paginated, Role } from "../../_lib/types";

export default function UserModal({
  open,
  onClose,
  onUpdated,
  user,
}: {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
  user: AdminUser | null;
}) {
  const [role, setRole] = useState<Role>("user");
  const [isActive, setIsActive] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !user) return;
    setRole(user.role);
    setIsActive(user.isActive ?? true);
    setError(null);

    let cancelled = false;
    setBookingsLoading(true);
    api
      .get<Paginated<Booking>>(
        `/bookings${buildQuery({ user: user._id, limit: 20, sort: "-createdAt" })}`,
      )
      .then((res) => !cancelled && setBookings(res.data))
      .catch(() => !cancelled && setBookings([]))
      .finally(() => !cancelled && setBookingsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [open, user]);

  if (!user) return null;

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await api.patch(`/users/${user!._id}`, { role, isActive });
      onUpdated();
      onClose();
    } catch {
      setError("Failed to update user profile");
    } finally {
      setSaving(false);
    }
  }

  const row =
    "flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0 text-sm";

  return (
    <Modal open={open} onClose={onClose} title={`Profile: ${user.name}`}>
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
          <div className={row}>
            <span className="text-slate-500 dark:text-slate-400">Email</span>
            <span className="text-slate-900 dark:text-white">{user.email}</span>
          </div>
          <div className={row}>
            <span className="text-slate-500 dark:text-slate-400">Phone</span>
            <span className="text-slate-900 dark:text-white">{user.phone}</span>
          </div>
          <div className={row}>
            <span className="text-slate-500 dark:text-slate-400">
              National ID
            </span>
            <span className="text-slate-900 dark:text-white">
              {user.nationalId}
            </span>
          </div>
          <div className={row}>
            <span className="text-slate-500 dark:text-slate-400">
              Joined Date
            </span>
            <span className="text-slate-900 dark:text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Role & Account Status
          </h3>
          {error && (
            <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-3 py-2 mb-2">
              {error}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": "#7167FF" } as React.CSSProperties}
            >
              <option value="user">Regular User</option>
              <option value="admin">Admin</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              Active Account
            </label>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mr-auto px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-60"
              style={{ backgroundColor: "#7167FF" }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            User Bookings
          </h3>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto">
            {bookingsLoading ? (
              <p className="text-sm text-slate-400 px-3 py-4 text-center">
                Loading...
              </p>
            ) : bookings.length === 0 ? (
              <p className="text-sm text-slate-400 px-3 py-4 text-center">
                No bookings found
              </p>
            ) : (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between px-3 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {b.referenceNumber}
                    </p>
                    <p className="text-xs text-slate-400">
                      {b.bookingType === "flight" ? "Flight" : "Hotel"} ·{" "}
                      {b.totalPrice.toLocaleString()} USD
                    </p>
                  </div>
                  <Badge value={b.status} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
}
