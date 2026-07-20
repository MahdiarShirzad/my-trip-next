import Image from "next/image";

export default function HotelHero() {
  return (
    <section className="relative w-full h-[620px] md:h-[760px] lg:h-[860px] overflow-hidden">
      {/* Background */}
      {/* TODO: swap the placeholder below for the real hero image, e.g. /images/hotel-hero.jpg */}
      <Image
        src="/images/05.jpg"
        alt="Hotel background"
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
            Stays &middot; Escapes
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your Next Stay
            <br />
            <span className="text-[#7167FF]">Starts Right Here</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-lg">
            Every room, sorted your way. Find the stay that fits your plans
            effortlessly.
          </p>

          {/* Divider — echoes the same motif used on the flights hero */}
          <div className="mt-10 flex w-full max-w-xs items-center gap-3 sm:max-w-sm">
            <span className="h-2 w-2 shrink-0 rounded-full border-2 border-white/40" />
            <span className="h-px flex-1 border-t-2 border-dashed border-white/30" />
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-[#7167FF]"
              fill="currentColor"
            >
              <path d="M7 13c0-2.76 2.24-5 5-5s5 2.24 5 5v3H7v-3zm-3 5h16v2H4v-2zM6 8a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
            <span className="h-px flex-1 border-t-2 border-dashed border-white/30" />
            <span className="h-2 w-2 shrink-0 rounded-full border-2 border-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
