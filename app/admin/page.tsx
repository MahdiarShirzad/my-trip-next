"use client";

import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock,
  CreditCard,
  Users,
  Plane,
  BuildingIcon,
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

// Reads the `total` field that ApiFeatures-based list endpoints already return,
// requesting the smallest possible page (limit=1) so we only pay for the count.
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Welcome 👋
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          An overview of MyTrip website status
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total Bookings"
          value={loading ? "—" : (stats?.totalBookings ?? 0)}
          icon={CalendarCheck}
          accent="custom"
          style={{ accentColor: "#7167FF" }}
        />
        <StatCard
          label="Pending Bookings"
          value={loading ? "—" : (stats?.pendingBookings ?? 0)}
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Paid Bookings"
          value={loading ? "—" : (stats?.paidBookings ?? 0)}
          icon={CreditCard}
          accent="emerald"
        />
        <StatCard
          label="Total Users"
          value={loading ? "—" : (stats?.totalUsers ?? 0)}
          icon={Users}
          accent="sky"
        />
        <StatCard
          label="Total Flights"
          value={loading ? "—" : (stats?.totalFlights ?? 0)}
          icon={Plane}
          accent="custom"
          style={{ accentColor: "#7167FF" }}
        />
        <StatCard
          label="Total Hotels"
          value={loading ? "—" : (stats?.totalHotels ?? 0)}
          icon={BuildingIcon}
          accent="amber"
        />
      </div>
    </div>
  );
}
