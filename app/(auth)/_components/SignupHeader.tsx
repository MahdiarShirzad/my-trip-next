export default function SignupHeader() {
  return (
    // Same dark-top-band fix as LoginHeader/ContactHeader: keeps the fixed
    // Header's white text readable at the top of the page. Light mode uses
    // the slate-500 gradient; dark mode keeps the slate-950 gradient.
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-500 dark:from-slate-950 dark:via-slate-950/95 via-slate-500/50 to-slate-50 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#7167FF]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-[#7167FF]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1320px] px-6 pb-16 pt-36 text-center sm:pb-20 sm:pt-44">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/5 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-slate-900 backdrop-blur-md dark:border-white/20 dark:bg-white/10 dark:text-white">
          Join Us
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Create Your
          <span className="text-[#7167FF]"> Account</span>
        </h1>
      </div>
    </section>
  );
}
