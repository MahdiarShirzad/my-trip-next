import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import PageHero from "@/app/(marketing)/_components/PageHero";

const helperLink =
  "font-semibold text-[#7167FF] transition-colors hover:text-[#5b52e0] dark:text-[#a39aff] dark:hover:text-[#b8b3ff]";

export default function NotFound() {
  return (
    <main className="w-full">
      <PageHero
        eyebrow="Error 404"
        title="This page is"
        highlight="off the map"
        description="The link may be broken, or the page may have been moved. Let's get you back on route and find what you're looking for."
      />

      <div className="mx-auto max-w-[760px] px-6 pb-20 pt-2 lg:pb-28">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-10 sm:py-12">
          <RouteIllustration />

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7167FF] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_15px_-4px_#7167FF] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5b51e6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <ArrowLeft
                aria-hidden
                strokeWidth={2.5}
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Back to Homepage
            </Link>

            <Link
              href="/hotels"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-[#7167FF] hover:text-[#7167FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:border-[#7167FF] dark:hover:text-[#a39aff] dark:focus-visible:ring-offset-slate-900 sm:w-auto"
            >
              <Compass aria-hidden strokeWidth={2.2} className="h-4 w-4" />
              Explore Hotels
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Prefer to keep moving?{" "}
            <Link href="/flights" className={helperLink}>
              Search flights
            </Link>{" "}
            or{" "}
            <Link href="/contact" className={helperLink}>
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

function RouteIllustration() {
  return (
    <svg
      viewBox="0 0 560 224"
      role="img"
      aria-label="A dotted travel route leading from a departing airplane to an unknown destination marked with a question mark"
      fill="none"
      className="mx-auto h-auto w-full max-w-[520px]"
    >
      {/* Soft map contour lines */}
      <g
        className="stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M-8 50C86 16 188 18 278 50s192 32 298 2" />
        <path d="M-8 180C86 146 188 148 278 180s192 32 298 2" />
      </g>

      {/* Latitude guides */}
      <g
        className="stroke-slate-200 dark:stroke-slate-800"
        strokeWidth="1.5"
        strokeDasharray="3 9"
        strokeLinecap="round"
      >
        <path d="M132 -8V232" />
        <path d="M420 -8V232" />
      </g>

      {/* Route */}
      <path
        d="M88 152C156 152 198 96 288 96s128 56 194 8"
        className="route-dash stroke-[#7167FF] dark:stroke-[#9f98ff]"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="1 15"
      />

      {/* Waypoint accent */}
      <circle cx="255" cy="99" r="9" className="fill-[#f96768]/15" />
      <circle cx="255" cy="99" r="4.5" className="fill-[#f96768]" />

      {/* Departure marker */}
      <circle
        cx="88"
        cy="152"
        r="27"
        className="fill-[#7167FF]/10 dark:fill-[#7167FF]/15"
      />
      <circle cx="88" cy="152" r="19" className="fill-[#7167FF]" />
      <g transform="translate(88 152) scale(0.78) translate(-12 -12)">
        <path
          className="fill-white"
          d="M22 16.5v-2l-8.5-5V4a1.5 1.5 0 0 0-3 0v5.5L2 14.5v2l8.5-2.6V19l-2.5 1.8V22l3.5-1 3.5 1v-1.2L12.5 19v-5.1l8.5 2.6Z"
        />
      </g>

      {/* Unknown destination */}
      <g transform="translate(482 104) scale(2.4) translate(-12 -22)">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          className="fill-[#7167FF]/10 stroke-[#7167FF] dark:fill-[#7167FF]/15 dark:stroke-[#9f98ff]"
          strokeWidth="1.6"
          strokeDasharray="2.5 2.5"
          strokeLinejoin="round"
        />
        <text
          x="12"
          y="9"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-[#7167FF] dark:fill-[#9f98ff]"
          fontSize="11"
          fontWeight="800"
        >
          ?
        </text>
      </g>
    </svg>
  );
}
