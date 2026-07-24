"use client";

import { useState } from "react";
import { useAuth } from "@/app/_components/AuthProvider";
import { setNationalId } from "@/lib/services/apiAuth";
import { ApiError } from "@/lib/utils/apiClient";

function maskNationalId(id: string) {
  if (id.length < 4) return id;
  return `${"•".repeat(id.length - 4)}${id.slice(-4)}`;
}

interface VerifiedIdentityCardProps {
  email: string;
  nationalId: string;
}

export default function VerifiedIdentityCard({
  email,
  nationalId,
}: VerifiedIdentityCardProps) {
  const { setUser } = useAuth();
  const [value, setValue] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\d{10}$/.test(value)) {
      setError("National ID must be 10 digits");
      return;
    }

    setIsPending(true);
    try {
      const res = await setNationalId(value);
      if (res?.data?.user) setUser(res.data.user);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="mb-5 flex items-center gap-2">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4 text-emerald-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Verified Identity
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </p>
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-[#0B1120] dark:text-slate-400">
            {email}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            National ID
          </p>

          {nationalId ? (
            <>
              <p className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-500 dark:border-slate-800 dark:bg-[#0B1120] dark:text-slate-400">
                {maskNationalId(nationalId)}
              </p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-600">
                To update this field, please contact support.
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
                placeholder="10-digit National ID"
                disabled={isPending}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-700 focus:border-[#7167FF] focus:outline-none dark:border-slate-800 dark:bg-[#0B1120] dark:text-slate-200"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={isPending || value.length !== 10}
                className="w-full rounded-lg bg-[#7167FF] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5b51e6] disabled:opacity-50"
              >
                {isPending ? "Submitting..." : "Submit National ID"}
              </button>
              <p className="text-xs text-slate-400 dark:text-slate-600">
                This field can only be set once. To change it later, you will
                need to contact support.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
