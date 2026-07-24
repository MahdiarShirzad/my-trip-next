"use client";

import { useState } from "react";
import { updatePassword } from "@/lib/services/apiAuth";
import { ApiError } from "@/lib/utils/apiClient";

export default function PasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("saving");
    try {
      await updatePassword({ currentPassword, newPassword });
      setStatus("saved");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof ApiError
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <h2 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Current Password
          </label>
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#7167FF] dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#7167FF] dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#7167FF] dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
            />
          </div>
        </div>

        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        {status === "saved" && (
          <p className="text-sm font-medium text-emerald-500">
            Password updated.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-[#7167FF] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5b51e6] disabled:opacity-60"
        >
          {status === "saving" ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
