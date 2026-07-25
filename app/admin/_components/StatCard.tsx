import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "purple" | "amber" | "emerald" | "sky";
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "purple",
}: StatCardProps) {
  const accentStyles = {
    purple: "bg-[#7167FF]/10 text-[#7167FF]",
    amber: "bg-amber-500/10 text-amber-500",
    emerald: "bg-emerald-500/10 text-emerald-500",
    sky: "bg-sky-500/10 text-sky-500",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-2 font-mono text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accentStyles[accent]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}
