import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  onChange,
  total,
  limit,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  total: number;
  limit: number;
}) {
  if (total === 0) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Showing {from} to {to} of {total} entries
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-2 text-sm text-slate-700 dark:text-slate-300">
          {page} / {Math.max(totalPages, 1)}
        </span>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800/60"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
