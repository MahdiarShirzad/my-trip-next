// app/user-panel/account/_components/AccountHeader.tsx
// Server Component.

interface AccountHeaderProps {
  name: string;
  email: string;
  role: "user" | "admin";
}

export default function AccountHeader({
  name,
  email,
  role,
}: AccountHeaderProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mb-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111827]">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#7167FF]/10 font-mono text-xl font-bold text-[#7167FF]">
        {initials}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="truncate text-xl font-bold text-slate-900 dark:text-white">
            {name}
          </h1>
          {role === "admin" && (
            <span className="rounded-full bg-[#7167FF]/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#7167FF]">
              Admin
            </span>
          )}
        </div>
        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
          {email}
        </p>
      </div>
    </div>
  );
}
