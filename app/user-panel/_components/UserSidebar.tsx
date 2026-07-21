// app/user-panel/_components/UserSidebar.tsx
// Server Component — pure nav markup. Active-link styling is handled via
// a tiny client component (UserSidebarLink) so the sidebar shell itself
// stays server-rendered.

import UserSidebarLink from "./UserSidebarLink";

const NAV_ITEMS = [
  {
    href: "/user-panel/account",
    label: "Account",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
  },
  {
    href: "/user-panel/bookings",
    label: "Bookings",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
      />
    ),
  },
];

export default function UserSidebar() {
  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#111827]">
        <p className="mb-3 px-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
          My Account
        </p>
        <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV_ITEMS.map((item) => (
            <UserSidebarLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
