import Image from "next/image";

export default function FlightHero() {
  return (
    <section className="relative w-full h-[640px] max-md:h-[560px] overflow-hidden">
      {/* Background */}
      <Image
        src="/images/01.jpg"
        alt="Flight background"
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="container max-w-[1200px] mx-auto flex flex-col items-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
            Departures &middot; Arrivals
          </span>

          <h1 className="text-white text-6xl max-md:text-4xl font-extrabold tracking-tight">
            Your Next Flight
            <br />
            <span className="text-[#7167FF]">Starts Right Here</span>
          </h1>

          <p className="text-white/80 mt-6 max-w-xl mx-auto text-lg">
            Every route, sorted your way. Find the seat that fits your plans
            effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
}
