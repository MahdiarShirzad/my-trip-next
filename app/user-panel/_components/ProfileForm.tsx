"use client";
// app/user-panel/account/_components/ProfileForm.tsx
// Client island: local edit-mode toggle + controlled inputs. Submission
// is stubbed with a mock async delay — wire to your real
// PATCH /api/users/me endpoint later (search for SWAP POINT below).

import { useState } from "react";

interface ProfileFormProps {
  initialName: string;
  initialPhone: string;
}

export default function ProfileForm({
  initialName,
  initialPhone,
}: ProfileFormProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );

  async function handleSave() {
    setStatus("saving");
    try {
      // --- SWAP POINT -------------------------------------------------
      // await fetch("/api/users/me", {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, phone }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 600)); // mock delay
      // ------------------------------------------------------------------
      setStatus("saved");
      setEditing(false);
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  function handleCancel() {
    setName(initialName);
    setPhone(initialPhone);
    setEditing(false);
    setStatus("idle");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Profile Details
        </h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-[#7167FF] hover:underline underline-offset-2"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-70 focus:border-[#F5A623] dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            disabled={!editing}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09xxxxxxxxx"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-70 focus:border-[#F5A623] dark:border-slate-700 dark:bg-[#0B1120] dark:text-white"
          />
        </div>

        {editing && (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={status === "saving"}
              className="rounded-full bg-[#7167FF] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#ffb945] disabled:opacity-60"
            >
              {status === "saving" ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              disabled={status === "saving"}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        )}

        {status === "saved" && (
          <p className="text-sm font-medium text-emerald-500">
            Profile updated.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
