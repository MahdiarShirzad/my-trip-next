export default function ContactHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b text-black from-slate-500 via-slate-500/50 to-slate-50 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#7167FF]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-[#7167FF]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 pb-20 pt-36 text-center sm:pb-24 sm:pt-44">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
          Get In Touch
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight  sm:text-5xl">
          We&apos;d Love To
          <span className="text-[#7167FF]"> Hear From You</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base  sm:text-lg">
          Questions, feedback, or just want to say hello? Reach out and our team
          will get back to you shortly.
        </p>
      </div>
    </section>
  );
}
