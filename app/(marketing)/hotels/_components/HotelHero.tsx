import type { CSSProperties } from "react";
import { Suspense } from "react";
import Image from "next/image";

export interface HotelHeroStats {
  staysCount: number;
  citiesCount: number;
}

interface HotelHeroProps {
  statsPromise?: Promise<HotelHeroStats>;
}

async function HotelHeroStatsBlock({
  statsPromise,
}: {
  statsPromise: Promise<HotelHeroStats>;
}) {
  const { staysCount, citiesCount } = await statsPromise;

  const hasStats = staysCount > 0 && citiesCount > 0;

  if (!hasStats) {
    return null;
  }

  return (
    <dl
      className="hero-reveal mt-6 flex items-baseline justify-center gap-2 text-white/75 sm:mt-7"
      style={{ "--reveal-delay": "220ms" } as CSSProperties}
    >
      <div className="flex items-baseline gap-1.5">
        <dt className="sr-only">Hotels available</dt>
        <dd className="text-lg font-semibold tabular-nums text-white sm:text-xl">
          {staysCount.toLocaleString("en-US")}
        </dd>
        <dd className="text-base sm:text-lg">stays across</dd>
      </div>
      <div className="flex items-baseline gap-1.5">
        <dt className="sr-only">Cities covered</dt>
        <dd className="text-lg font-semibold tabular-nums text-white sm:text-xl">
          {citiesCount.toLocaleString("en-US")}
        </dd>
        <dd className="text-base sm:text-lg">cities</dd>
      </div>
    </dl>
  );
}

function HotelHeroStatsFallback() {
  return (
    <div
      className="mt-6 flex animate-pulse items-baseline justify-center gap-2 sm:mt-7"
      aria-hidden="true"
    >
      <div className="h-6 w-36 rounded bg-white/20" />
      <div className="h-6 w-28 rounded bg-white/20" />
    </div>
  );
}

export default function HotelHero({ statsPromise }: HotelHeroProps) {
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
            className="object-cover object-[50%_70%]"
          />
        </div>
        {/* The pavilion is symmetric, so the type sits on its axis too —
            the scrim deepens toward the bottom where the copy and the
            search card land, and lets the roofline stay crisp */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10" />
      </div>

      {/* Content — centered on the pavilion's axis; the reflection leads
          down into the search card */}
      <div className="relative mx-auto flex min-h-[540px] max-w-[1320px] flex-col items-center justify-end px-6 pb-44 text-center max-md:min-h-[520px] max-md:pb-40 sm:px-8 md:min-h-[620px] lg:min-h-[700px] lg:pb-52">
        <h1 className="hero-reveal max-w-3xl text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl sm:leading-[1.04] lg:text-7xl">
          Find the stay that makes the trip.
        </h1>

        <p
          className="hero-reveal mt-5 max-w-md text-pretty text-base leading-relaxed text-white/85 sm:text-lg"
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          Tell us where and when. We&rsquo;ll find the room.
        </p>

        {statsPromise && (
          <Suspense fallback={<HotelHeroStatsFallback />}>
            <HotelHeroStatsBlock statsPromise={statsPromise} />
          </Suspense>
        )}
      </div>
    </section>
  );
}
