import type { CSSProperties } from "react";
import Image from "next/image";

interface HotelHeroProps {
  staysCount?: number;
  citiesCount?: number;
}

export default function HotelHero({ staysCount, citiesCount }: HotelHeroProps) {
  const hasStats =
    typeof staysCount === "number" &&
    staysCount > 0 &&
    typeof citiesCount === "number" &&
    citiesCount > 0;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Photography */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-settle absolute inset-0">
          <Image
            src="/images/hero-hotels.jpg"
            alt="Hotel pavilion with a lit pool at dusk under a deep blue sky"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[50%_65%]"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
      </div>

      {/* Content — bottom-left anchored, leaving the pavilion to breathe on the right */}
      <div className="relative mx-auto flex min-h-[540px] max-w-[1320px] flex-col justify-end px-6 pb-44 max-md:min-h-[520px] max-md:pb-40 sm:px-8 md:min-h-[620px] lg:min-h-[700px] lg:pb-52">
        <h1 className="hero-reveal max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl sm:leading-[1.04] lg:text-7xl">
          Find the stay that makes the trip.
        </h1>

        <p
          className="hero-reveal mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          Real rooms, sorted by price, property type, and guest rating.
        </p>

        {hasStats && (
          <dl
            className="hero-reveal mt-8 flex items-center gap-8 border-t border-white/25 pt-5"
            style={{ "--reveal-delay": "220ms" } as CSSProperties}
          >
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Hotels available</dt>
              <dd className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                {staysCount.toLocaleString("en-US")}
              </dd>
              <dd className="text-sm text-white/75">stays</dd>
            </div>
            <div
              className="h-8 w-px bg-white/25"
              role="presentation"
              aria-hidden
            />
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Cities covered</dt>
              <dd className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                {citiesCount.toLocaleString("en-US")}
              </dd>
              <dd className="text-sm text-white/75">cities</dd>
            </div>
          </dl>
        )}
      </div>
    </section>
  );
}
