"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  CreditCard,
  Users,
  Plane,
  BuildingIcon,
  LayoutDashboard,
} from "lucide-react";
import StatCard from "./_components/StatCard";
import { api, buildQuery } from "./_lib/api";
import { Paginated } from "./_lib/types";

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  paidBookings: number;
  totalUsers: number;
  totalFlights: number;
  totalHotels: number;
}

async function countFrom(path: string, filters: Record<string, string> = {}) {
  const query = buildQuery({ limit: 1, page: 1, ...filters });
  const res = await api.get<Paginated<unknown>>(`${path}${query}`);
  return res.total ?? res.results ?? 0;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [
          totalBookings,
          pendingBookings,
          paidBookings,
          totalUsers,
          totalFlights,
          totalHotels,
        ] = await Promise.all([
          countFrom("/bookings"),
          countFrom("/bookings", { status: "pending" }),
          countFrom("/bookings", { paymentStatus: "paid" }),
          countFrom("/users"),
          countFrom("/flights"),
          countFrom("/hotels"),
        ]);

        if (!cancelled) {
          setStats({
            totalBookings,
            pendingBookings,
            paidBookings,
            totalUsers,
            totalFlights,
            totalHotels,
          });
        }
      } catch {
        if (!cancelled)
          setError(
            "Failed to fetch statistics. Please check your API connection.",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#7167FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* هدر دشبورد با استایل بنر یوزر پنل */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#7167FF]/10 text-[#7167FF]">
          <LayoutDashboard className="h-7 w-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Admin Overview 👋
            </h1>
            <span className="rounded-full bg-[#7167FF]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#7167FF]">
              Live Stats
            </span>
          </div>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            An overview of MyTrip website status and management performance.
          </p>
        </div>
      </div>

      {/* نمایش خطا */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* شبکه‌بندی کارت‌های آمار */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total Bookings"
          value={stats?.totalBookings ?? 0}
          icon={CalendarCheck}
          accent="purple"
        />
        <StatCard
          label="Pending Bookings"
          value={stats?.pendingBookings ?? 0}
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Paid Bookings"
          value={stats?.paidBookings ?? 0}
          icon={CreditCard}
          accent="emerald"
        />
        <StatCard
          label="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={Users}
          accent="sky"
        />
        <StatCard
          label="Total Flights"
          value={stats?.totalFlights ?? 0}
          icon={Plane}
          accent="purple"
        />
        <StatCard
          label="Total Hotels"
          value={stats?.totalHotels ?? 0}
          icon={BuildingIcon}
          accent="amber"
        />
      </div>
    </div>
  );
}
