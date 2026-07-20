export default function ContactHeader() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 pt-24 pb-4 rounded-b-[1.5rem] transition-colors duration-300" />

      <div className="mx-auto max-w-[1320px] px-6 pt-10 pb-6 text-center">
        <span className="mb-4 inline-flex items-center rounded-full bg-[#7167FF]/10 border border-[#7167FF]/25 px-4 py-1 text-xs font-semibold text-[#7167FF] dark:text-[#b8b3ff]">
          Get In Touch
        </span>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          We&apos;d Love To{" "}
          <span className="text-[#7167FF]">Hear From You</span>
        </h1>

        <p className="mx-auto max-w-xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          Questions, feedback, or just want to say hello? Reach out and our team
          will get back to you shortly.
        </p>
      </div>
    </div>
  );
}
