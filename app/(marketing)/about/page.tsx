import PageHero from "@/app/(marketing)/_components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "My Trip makes it simple to compare and book flights and hotels with clear prices and no surprises.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | My Trip",
    description:
      "Compare and book flights and hotels with clear prices and no surprises.",
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
  },
};

const VALUES = [
  {
    title: "Clear Pricing",
    body: "The price you see is the price you pay. No hidden fees appearing at the last step.",
  },
  {
    title: "Fast Booking",
    body: "Search, compare, and confirm in a few taps with a flow built for speed.",
  },
  {
    title: "Real Support",
    body: "A team you can actually reach when something does not go to plan.",
  },
];

const STATS = [
  { value: "500+", label: "Destinations" },
  { value: "1M+", label: "Trips booked" },
  { value: "24/7", label: "Support" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="About"
        highlight="My Trip"
        description="A simple way to find and book flights and hotels — built around clear prices and no surprises."
      />

      <div className="mx-auto my-16 max-w-[900px] px-6 lg:my-20">
        <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-slate-600 dark:text-slate-400">
          My Trip brings flight and hotel search into one clean experience. This
          is a demonstration project showcasing the booking flow, from search
          and results through to confirmation. All data shown is mock data.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-3xl font-extrabold text-[#7167FF]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                {value.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
