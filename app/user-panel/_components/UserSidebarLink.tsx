"use client";
// app/user-panel/_components/UserSidebarLink.tsx
// The ONLY client piece of the sidebar — needs usePathname to highlight
// the active route. Everything else in the sidebar stays server-rendered.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface UserSidebarLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export default function UserSidebarLink({
  href,
  label,
  icon,
}: UserSidebarLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[#7167FF]/10 text-[#7167FF]"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-5 w-5 shrink-0"
      >
        {icon}
      </svg>
      {label}
    </Link>
  );
}
