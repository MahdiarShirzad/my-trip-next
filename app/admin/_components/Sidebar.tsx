"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plane,
  BuildingIcon,
  CalendarCheck,
  Users,
  ArrowLeft,
  PlaneTakeoff,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/flights", label: "Flights", icon: Plane },
  { href: "/admin/hotels", label: "Hotels", icon: BuildingIcon },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827]">
        <div className="mb-4 flex items-center gap-2 px-2 pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <PlaneTakeoff className="w-5 h-5" style={{ color: "#7167FF" }} />
          <span className="font-bold text-slate-900 dark:text-white">
            MyTrip <span style={{ color: "#7167FF" }}>Admin</span>
          </span>
        </div>

        <p className="mb-3 px-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
          Admin Menu
        </p>

        <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all shrink-0 ${
                  active
                    ? "text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                }`}
                style={
                  active
                    ? {
                        backgroundColor: "#7167FF",
                        boxShadow: "0 2px 8px rgba(113, 103, 255, 0.25)",
                      }
                    : undefined
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
