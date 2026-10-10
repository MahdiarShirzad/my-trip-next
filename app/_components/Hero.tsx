import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  { name: "Paris", image: "/images/paris.jpg" },
  { name: "Dubai", image: "/images/dubai.jpg" },
  { name: "Istanbul", image: "/images/istanbul.jpg" },
  { name: "Rome", image: "/images/rome.jpg" },
];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Photography */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-settle absolute inset-0">
          <Image
            src="/images/hero-home.jpg"
            alt="Bow of a wooden boat pointing toward mountains across an alpine lake"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[50%_60%]"
          />
        </div>
        {/* Top scrim keeps the fixed header legible */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-transparent" />
        {/* Reading scrim behind the headline block */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[680px] max-w-[1320px] flex-col justify-end px-6 pb-48 pt-32 max-md:min-h-[620px] max-md:pb-44 sm:px-8 lg:min-h-[760px] lg:pb-56">
        <h1 className="hero-reveal max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-7xl sm:leading-[1.02] lg:text-8xl">
          From here
          <span className="block">to anywhere.</span>
        </h1>

        <p
          className="hero-reveal mt-5 max-w-md text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          Compare flights and stays in one search, then book in minutes.
        </p>

        {/* Destination index — each city opens the hotel search pre-filled */}
        <div
          className="hero-reveal mt-10 max-md:-mx-6 max-md:px-6 max-md:overflow-x-auto max-md:[scrollbar-width:none] sm:mt-12"
          style={{ "--reveal-delay": "220ms" } as CSSProperties}
        >
          <ul className="flex snap-x gap-3 sm:gap-4">
            {destinations.map((item) => (
              <li key={item.name} className="shrink-0 snap-start">
                <Link
                  href={`/hotels?destinationCity=${encodeURIComponent(item.name)}`}
                  className="group relative block h-24 w-36 overflow-hidden rounded-xl border border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:h-28 sm:w-44"
                  aria-label={`Search stays in ${item.name}`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent transition-colors duration-300 group-hover:from-slate-950/80" />
                  <span className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-sm font-semibold text-white">
                    {item.name}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
