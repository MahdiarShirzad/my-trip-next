"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function HeaderChrome({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-scrolled={isScrolled}
      className="transition-colors duration-300 bg-transparent text-white
        data-[scrolled=true]:bg-white data-[scrolled=true]:text-slate-900
        data-[scrolled=true]:dark:bg-slate-950 data-[scrolled=true]:dark:text-white
        data-[scrolled=true]:shadow-sm data-[scrolled=true]:dark:shadow-black/20"
    >
      {children}
    </div>
  );
}
