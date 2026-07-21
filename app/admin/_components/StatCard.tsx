import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "indigo",
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "indigo" | "amber" | "emerald" | "sky";
}) {
  const accents: Record<string, string> = {
    indigo: "text-indigo-600 dark:text-indigo-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${
          accent === "indigo" ? "" : accents[accent]
        }`}
        style={
          accent === "indigo"
            ? { backgroundColor: "rgba(113, 103, 255, 0.1)", color: "#7167FF" }
            : undefined
        }
      >
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
