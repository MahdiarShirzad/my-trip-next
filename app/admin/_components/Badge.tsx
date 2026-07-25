const COLOR_MAP: Record<string, string> = {
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  confirmed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  completed: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  cancelled: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  failed: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  scheduled:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  delayed:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  active:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  disabled: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
  admin:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  user: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const LABEL_MAP: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  paid: "Paid",
  failed: "Failed",
  scheduled: "Scheduled",
  delayed: "Delayed",
  active: "Active",
  disabled: "Disabled",
  admin: "Admin",
  user: "User",
};

export default function Badge({ value }: { value: string }) {
  const normalizedValue = value?.toLowerCase() ?? "";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        COLOR_MAP[normalizedValue] ??
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      }`}
    >
      {LABEL_MAP[normalizedValue] ?? value}
    </span>
  );
}
