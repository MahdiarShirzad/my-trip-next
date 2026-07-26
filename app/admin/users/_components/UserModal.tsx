"use client";

import { useState } from "react";
import Modal from "../../_components/Modal";
import Badge from "../../_components/Badge";
import { useUpdateUserRole } from "../../_lib/queries/useUsers";
import { useUserBookings } from "../../_lib/queries/useBookings";
import { AdminUser, Role } from "../../_lib/types";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export default function UserModal({ open, onClose, user }: UserModalProps) {
  const [role, setRole] = useState<Role>(user?.role ?? "user");
  const [error, setError] = useState<string | null>(null);

  const updateRole = useUpdateUserRole();
  const { data: bookings = [], isLoading: bookingsLoading } = useUserBookings(
    open ? user?._id : undefined,
  );

  if (!user) return null;

  const isDirty = role !== user.role;

  async function handleSave() {
    if (!user) return;
    setError(null);
    try {
      await updateRole.mutateAsync({ id: user._id, role });
      onClose();
    } catch {
      setError("Failed to update user role");
    }
  }

  const rowStyle =
    "flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0 text-sm";

  return (
    <Modal open={open} onClose={onClose} title={`Profile: ${user.name}`}>
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
          <div className={rowStyle}>
            <span className="text-slate-500 dark:text-slate-400">Email</span>
            <span className="text-slate-900 dark:text-white">{user.email}</span>
          </div>
          <div className={rowStyle}>
            <span className="text-slate-500 dark:text-slate-400">Phone</span>
            <span className="text-slate-900 dark:text-white">
              {user.phone || "—"}
            </span>
          </div>
          <div className={rowStyle}>
            <span className="text-slate-500 dark:text-slate-400">
              National ID
            </span>
            <span className="text-slate-900 dark:text-white">
              {user.nationalId || "—"}
            </span>
          </div>
          <div className={rowStyle}>
            <span className="text-slate-500 dark:text-slate-400">
              Joined Date
            </span>
            <span className="text-slate-900 dark:text-white">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            Role
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
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7167FF]"
            >
              <option value="user">Regular User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="button"
              onClick={handleSave}
              disabled={updateRole.isPending || !isDirty}
              className="ml-auto px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: "#7167FF" }}
            >
              {updateRole.isPending ? "Saving..." : "Save Changes"}
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
                      {b.totalPrice?.toLocaleString() ?? 0} USD
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
