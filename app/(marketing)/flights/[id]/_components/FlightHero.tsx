import Image from "next/image";

export default function FlightHero() {
  return (
    <section className="relative w-full h-[620px] md:h-[760px] lg:h-[860px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/01.jpg"
        alt="Flight background"
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-28 text-center sm:pb-36 lg:pb-40">
        <div className="container mx-auto flex max-w-[1200px] flex-col items-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
            Departures &middot; Arrivals
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your Next Flight
            <br />
            <span className="text-[#7167FF]">Starts Right Here</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-lg">
            Every route, sorted your way. Find the seat that fits your plans
            effortlessly.
          </p>

          {/* Flight-path divider — echoes the boarding-pass motif on the result cards below */}
          <div className="mt-10 flex w-full max-w-xs items-center gap-3 sm:max-w-sm">
            <span className="h-2 w-2 shrink-0 rounded-full border-2 border-white/40" />
            <span className="h-px flex-1 border-t-2 border-dashed border-white/30" />
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 rotate-90 text-[#7167FF]"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <span className="h-px flex-1 border-t-2 border-dashed border-white/30" />
            <span className="h-2 w-2 shrink-0 rounded-full border-2 border-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
