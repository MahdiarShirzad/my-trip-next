import type { CSSProperties } from "react";
import Image from "next/image";

export default function FlightHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Photography */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-settle absolute inset-0">
          <Image
            src="/images/hero-flights.jpg"
            alt="Aircraft waiting on the tarmac at golden hour, sun glowing behind its tail"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[60%_75%]"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/55 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
      </div>

      {/* Route line — sweeps from the headline toward the search card below.
          Purely directional: it points at the search form, it names no route. */}
      <svg
        aria-hidden
        viewBox="0 0 600 320"
        fill="none"
        className="pointer-events-none absolute -right-10 bottom-16 hidden w-[420px] -rotate-6 lg:block xl:w-[520px]"
      >
        <path
          d="M20 40 C 220 60, 420 160, 560 288"
          stroke="white"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeDasharray="1 8"
          strokeLinecap="round"
        />
        <circle cx="20" cy="40" r="5" fill="#7167FF" />
        <circle cx="20" cy="40" r="10" stroke="#7167FF" strokeOpacity="0.4" />
        <circle
          cx="560"
          cy="288"
          r="5"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[540px] max-w-[1320px] flex-col justify-end px-6 pb-44 max-md:min-h-[520px] max-md:pb-40 sm:px-8 md:min-h-[620px] lg:min-h-[700px] lg:pb-52">
        <h1 className="hero-reveal max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl sm:leading-[1.04] lg:text-7xl">
          Your next departure is one search away.
        </h1>

        <p
          className="hero-reveal mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          Compare airlines, cabins, and times across 6,000+ airports.
        </p>
      </div>
    </section>
  );
}
