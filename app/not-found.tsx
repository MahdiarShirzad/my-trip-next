import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 pt-24 pb-4 rounded-b-[1.5rem] transition-colors duration-300" />

      <div className="mx-auto max-w-[1040px] px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="flex flex-col items-center text-center md:items-start md:text-left flex-1 max-w-xl">
          <span className="mb-3 inline-flex items-center rounded-full bg-[#7167FF]/10 border border-[#7167FF]/25 px-3 py-0.5 text-xs font-semibold text-[#7167FF] dark:text-[#b8b3ff]">
            Error 404
          </span>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Page <span className="text-[#7167FF]">Not Found</span>
          </h1>

          <p className="mb-8 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            This page doesn’t exist or has been removed. Let's get you back to
            safety and find what you need.
          </p>

          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full bg-[#7167FF] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_15px_-4px_#7167FF] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5f55f5]"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Homepage
          </Link>
        </div>

        <div className="flex-1 w-full max-w-[280px] sm:max-w-[360px] relative group">
          <div className="absolute inset-0 scale-95 rounded-2xl bg-[#7167FF]/5 blur-xl" />
          <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800/60 dark:bg-[#161622]">
            <Image
              src="/images/notfound.png"
              alt="404 Illustration"
              width={360}
              height={280}
              className="w-full h-auto object-contain opacity-95 dark:opacity-90 transition-transform duration-500 group-hover:scale-102"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
