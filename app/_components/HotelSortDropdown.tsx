// components/hotels/HotelSortDropdown.tsx
"use client";

import { ArrowUpDown } from "lucide-react";
import { SORT_OPTIONS, SortOption } from "../(marketing)/hotels/hotel";

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function HotelSortDropdown({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-slate-400" aria-hidden />
      <label
        htmlFor="hotel-sort"
        className="text-sm text-slate-500 whitespace-nowrap"
      >
        Sort by
      </label>
      <select
        id="hotel-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
