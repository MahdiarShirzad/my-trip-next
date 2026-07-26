"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_components/AuthProvider";
import { logout as logoutRequest } from "@/lib/services/apiAuth";

export default function UserMenu() {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const initial =
    user.name?.trim()?.[0]?.toUpperCase() ?? user.email[0].toUpperCase();

  const menuItemClass =
    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800";

  async function handleLogout() {
    try {
      await logoutRequest();
    } catch (err) {
      console.log("logout error:", err);
    } finally {
      setUser(null);
      setIsOpen(false);
      router.push("/");
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7167FF] text-white text-sm font-bold">
          {initial}
        </span>

        <span className="hidden sm:inline text-sm font-semibold max-w-[120px] truncate">
          {user.name || user.email}
        </span>

        <svg
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border-2 border-slate-200 bg-white p-1.5 shadow-lg shadow-black/5 dark:border-slate-700 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
          {/* User Info */}
          <div className="mb-1 border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
            <p className="truncate text-sm font-bold">{user.name || "User"}</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>

          {/* ===== ADMIN MENU ===== */}
          {user.role === "admin" ? (
            <>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                Dashboard
              </Link>

              <Link
                href="/admin/users"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                Users
              </Link>

              <Link
                href="/admin/flights"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                Flights
              </Link>

              <Link
                href="/admin/hotels"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                Hotels
              </Link>

              <Link
                href="/admin/bookings"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                Bookings
              </Link>
            </>
          ) : (
            /* ===== USER MENU ===== */
            <>
              <Link
                href="/user-panel/account"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                Account
              </Link>

              <Link
                href="/user-panel/bookings"
                onClick={() => setIsOpen(false)}
                className={menuItemClass}
              >
                My Bookings
              </Link>
            </>
          )}

          {/* Divider */}
          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
