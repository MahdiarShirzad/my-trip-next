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

function DestinationLink({
  name,
  image,
  withRule,
}: {
  name: string;
  image: string;
  withRule?: boolean;
}) {
  return (
    <Link
      href={`/hotels?destinationCity=${encodeURIComponent(name)}`}
      className={`group -mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
        withRule ? "border-b border-white/15" : ""
      }`}
      aria-label={`Search stays in ${name}`}
    >
      <span className="flex items-center gap-3.5">
        <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt=""
            fill
            sizes="88px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
          />
        </span>
        <span className="font-medium text-white">{name}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 -translate-x-1 text-white/80 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        strokeWidth={2.5}
        aria-hidden
      />
    </Link>
  );
}

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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
        {/* Quiets the forest behind the destination rail on desktop */}
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-slate-950/55 to-transparent lg:block" />
      </div>

      {/* Content — headline rides the boat's wake on the left; the
          destination index holds the right edge like a table of contents */}
      <div className="relative mx-auto flex min-h-[680px] max-w-[1320px] flex-col justify-end px-6 pb-48 pt-32 max-md:min-h-[620px] max-md:pb-44 sm:px-8 lg:min-h-[760px] lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-56">
        <div>
          <h1 className="hero-reveal max-w-3xl text-balance text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-7xl sm:leading-[1.02] lg:text-8xl">
            From here
            <span className="block">to anywhere.</span>
          </h1>

          <p
            className="hero-reveal mt-5 max-w-sm text-pretty text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg"
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
          >
            Compare flights and stays in one search,
            <span className="block">then book in minutes.</span>
          </p>
        </div>

        {/* Destination index — each city opens the hotel search pre-filled */}
        <div
          className="hero-reveal mt-10 max-md:-mx-6 max-md:px-6 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:overflow-x-auto lg:mt-0 lg:w-64 lg:shrink-0"
          style={{ "--reveal-delay": "220ms" } as CSSProperties}
        >
          <ul className="flex snap-x gap-2 lg:flex-col lg:gap-0">
            {destinations.map((item, index) => (
              <li
                key={item.name}
                className="shrink-0 snap-start lg:w-full"
              >
                <DestinationLink
                  name={item.name}
                  image={item.image}
                  withRule={index < destinations.length - 1}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
