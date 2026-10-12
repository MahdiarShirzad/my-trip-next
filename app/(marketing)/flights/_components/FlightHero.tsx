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
            className="object-cover object-[60%_70%]"
          />
        </div>
        {/* Reading scrim behind the upper-left headline; lets the sunset
            and the aircraft stay unfiltered in the lower two-thirds */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/30 to-transparent" />
        {/* Softens the tarmac where the search card lands */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950/70 to-transparent" />
      </div>

      {/* Content — anchored top-left so the aircraft owns the lower frame,
          and the eye travels headline → nose → search card */}
      <div className="relative mx-auto flex min-h-[540px] max-w-[1320px] flex-col justify-start px-6 pt-32 max-md:min-h-[520px] sm:px-8 sm:pt-36 md:min-h-[620px] lg:min-h-[700px] lg:pt-40">
        <h1 className="hero-reveal max-w-3xl text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl sm:leading-[1.04] lg:text-7xl">
          Your next departure is one search away.
        </h1>

        <p
          className="hero-reveal mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          Compare airlines, cabins, and times
          <span className="block">across 6,000+ airports.</span>
        </p>
      </div>
    </section>
  );
}
