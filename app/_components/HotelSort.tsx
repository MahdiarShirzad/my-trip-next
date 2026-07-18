"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { SORT_OPTIONS } from "@/lib/hotel-filters";

export default function HotelSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const value = searchParams.get("sort") ?? "default";

  function handleChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "default") {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="hotel-sort"
        className="text-sm font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap"
      >
        Sort by
      </label>
      <select
        id="hotel-sort"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-bold text-slate-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#7167FF] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
