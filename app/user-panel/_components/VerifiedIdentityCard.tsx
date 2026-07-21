// app/user-panel/account/_components/VerifiedIdentityCard.tsx
// Server Component. Email and nationalId are treated as verified,
// non-self-editable identity fields (matches backend: email has a
// uniqueness/format constraint, nationalId is a fixed legal ID) —
// changing either should go through a separate verification flow,
// not the quick profile form.

function maskNationalId(id: string) {
  if (id.length < 4) return id;
  return `${"•".repeat(id.length - 4)}${id.slice(-4)}`;
}

interface VerifiedIdentityCardProps {
  email: string;
  nationalId: string;
}

export default function VerifiedIdentityCard({ email, nationalId }: VerifiedIdentityCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="mb-5 flex items-center gap-2">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4 text-emerald-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Verified Identity
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Email</p>
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-[#0B1120] dark:text-slate-400">
            {email}
          </p>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            National ID
          </p>
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-500 dark:border-slate-800 dark:bg-[#0B1120] dark:text-slate-400">
            {maskNationalId(nationalId)}
          </p>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-600">
          To update these fields, contact support for identity re-verification.
        </p>
      </div>
    </div>
  );
}
