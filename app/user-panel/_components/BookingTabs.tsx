"use client";
// app/user-panel/bookings/_components/BookingTabs.tsx
// Client island: reads/writes a `?tab=` search param so filtering
// happens on the server render, same pattern as the flights filters.

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const TABS = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="flex gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-[#111827]">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleSelect(tab.value)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.value
              ? "bg-[#7167FF] text-white"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
