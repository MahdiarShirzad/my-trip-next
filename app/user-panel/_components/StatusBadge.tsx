// app/user-panel/bookings/_components/StatusBadge.tsx
// Server Component.

const STATUS_STYLES: Record<string, string> = {
  confirmed:
    "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/10 dark:text-[#F5A623]",
  cancelled: "bg-red-500/10 text-red-500 dark:bg-red-500/10 dark:text-red-400",
  expired: "bg-slate-500/10 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400",
};

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Confirmed",
  pending: "Pending Payment",
  cancelled: "Cancelled",
  expired: "Expired",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide ${
        STATUS_STYLES[status] ?? STATUS_STYLES.expired
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
