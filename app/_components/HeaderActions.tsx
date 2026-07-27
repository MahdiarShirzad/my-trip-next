"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_components/AuthProvider";
import UserMenu from "./UserMenu";

export default function HeaderActions() {
  const { resolvedTheme, setTheme } = useTheme();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const showSkeleton = !mounted || isLoading;

  return (
    <div className="flex items-center gap-5 max-sm:gap-3 text-sm font-semibold">
      {showSkeleton ? (
        <div className="h-9 w-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      ) : user ? (
        <UserMenu />
      ) : (
        <>
          <Link
            href="/login"
            className="hidden sm:flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" viewBox="0 0 15 15" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 1C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H12V13H4.5C4.22386 13 4 13.2239 4 13.5C4 13.7761 4.22386 14 4.5 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H4.5ZM6.60355 4.89645C6.40829 4.70118 6.09171 4.70118 5.89645 4.89645C5.70118 5.09171 5.70118 5.40829 5.89645 5.60355L7.29289 7H0.5C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H7.29289L5.89645 9.39645C5.70118 9.59171 5.70118 9.90829 5.89645 10.1036C6.09171 10.2988 6.40829 10.2988 6.60355 10.1036L8.85355 7.85355C9.04882 7.65829 9.04882 7.34171 8.85355 7.14645L6.60355 4.89645Z"
                fill="currentColor"
              />
            </svg>
            Login
          </Link>

          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-full bg-[#7167FF] px-4 py-2 text-white transition-colors hover:bg-[#5b51e6]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="6"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Sign Up
          </Link>
        </>
      )}

      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
      >
        {!mounted ? (
          <span className="h-5 w-5" />
        ) : isDark ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
