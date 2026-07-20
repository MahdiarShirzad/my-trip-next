"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileNav({
  links,
}: {
  links: { id: number; title: string; path: string }[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="w-9 h-9 flex items-center justify-center"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 17h16M4 12h16M4 7h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[1100] bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-[1101] w-[78%] max-w-xs bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-start gap-6 px-8 pt-4 font-semibold text-lg">
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.path} onClick={() => setOpen(false)}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
