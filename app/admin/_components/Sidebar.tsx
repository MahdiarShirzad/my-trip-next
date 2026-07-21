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
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1120]">
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-200 dark:border-slate-800">
        <PlaneTakeoff className="w-5 h-5" style={{ color: "#7167FF" }} />
        <span className="font-bold text-slate-900 dark:text-white">
          MyTrip <span style={{ color: "#7167FF" }}>Admin</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
              }`}
              style={
                active
                  ? {
                      backgroundColor: "#7167FF",
                      boxShadow: "0 1px 2px rgba(113, 103, 255, 0.3)",
                    }
                  : undefined
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </div>
    </aside>
  );
}
