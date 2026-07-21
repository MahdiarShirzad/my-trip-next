"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  LayoutDashboard,
  Plane,
  BuildingIcon,
  CalendarCheck,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/flights", label: "Flights", icon: Plane },
  { href: "/admin/hotels", label: "Hotels", icon: BuildingIcon },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/users", label: "Users", icon: Users },
];

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/flights": "Flight Management",
  "/admin/hotels": "Hotel Management",
  "/admin/bookings": "Booking Management",
  "/admin/users": "User Management",
};

export default function Topbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const title =
    TITLES[pathname] ??
    Object.entries(TITLES).find(
      ([href]) => href !== "/admin" && pathname.startsWith(href),
    )?.[1] ??
    "Admin Panel";

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-64 bg-white dark:bg-[#0b1120] border-l border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="font-bold text-slate-900 dark:text-white">
                MyTrip Admin
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
                const active = exact
                  ? pathname === href
                  : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
