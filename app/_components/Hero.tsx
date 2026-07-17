"use client";

import Image from "next/image";

function Hero() {
  const scrollToSearch = () => {
    document
      .getElementById("trip-search")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[720px] max-md:h-[640px] overflow-hidden">
      {/* Background photo — swap the src below for the new hero image */}
      <Image
        src="/images/hero.png"
        alt="Traveler overlooking a scenic destination"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-20"
      />

      {/* Layered gradient overlay — deeper in dark mode, airier in light mode */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-indigo-950/10 dark:from-black/95 dark:via-black/60 dark:to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="container max-w-[1320px] mx-auto flex flex-col items-center">
          {/* Eyebrow pill — names the actual services, not decoration */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6 font-interSemiBold text-xs tracking-[0.15em] uppercase text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7167FF]" />
            Flights · Hotels · Packages
          </div>

          {/* Headline */}
          <h1 className="font-interExtraBold text-white text-[3.75rem] leading-[1.05] tracking-tight max-md:text-4xl">
            Your Next Journey
            <br />
            <span className="bg-gradient-to-r from-[#9C93FF] to-[#7167FF] bg-clip-text text-transparent">
              Starts Here
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-inter text-white/80 text-xl mt-6 max-w-xl max-md:text-base max-md:mt-4">
            Compare and book flights, hotels and tour packages in one place —
            best prices, zero hassle.
          </p>

          {/* Primary CTA — scrolls to the search widget below */}
          <button
            onClick={scrollToSearch}
            className="mt-10 font-interSemiBold text-white bg-[#7167FF] hover:bg-[#5d52ef] transition-colors rounded-full px-8 py-4 shadow-[0_8px_30px_-8px_rgba(113,103,255,0.6)] max-md:mt-6"
          >
            Find Your Trip
          </button>
        </div>

        {/* Scroll cue — respects reduced-motion preference */}
        <button
          onClick={scrollToSearch}
          aria-label="Scroll to search"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce text-white/70 hover:text-white transition-colors max-md:hidden"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Hero;
