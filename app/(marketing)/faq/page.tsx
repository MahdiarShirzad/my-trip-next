import PageHero from "@/app/(marketing)/_components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about booking flights and hotels with My Trip.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | My Trip",
    description: "Common questions about booking with My Trip.",
    siteName: "My Trip",
    type: "website",
    locale: "en_US",
  },
};

const FAQS = [
  {
    question: "How do I search for a flight?",
    answer:
      "Open the Flights page, choose your departure and destination cities, pick your travel dates and passenger count, then hit search to see available results.",
  },
  {
    question: "How do I book a hotel?",
    answer:
      "Head to the Hotels page, enter a destination and your check-in and check-out dates, and browse the results. Select a room and complete the booking flow to confirm.",
  },
  {
    question: "Can I cancel or change a booking?",
    answer:
      "Cancellation and change options depend on the airline or hotel policy for your specific booking. Review the policy shown during checkout before you confirm.",
  },
  {
    question: "Do I need an account to book?",
    answer:
      "You can browse flights and hotels without an account, but you will need to sign in to complete and manage a booking.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "This is a demonstration project, so no real payments are processed. In a production deployment, common card and wallet methods would be supported.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Use the Contact page to reach the team, or email mahdiar55582@gmail.com. We aim to respond within one business day.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Need A Hand?"
        title="Frequently Asked"
        highlight="Questions"
        description="Quick answers to the things people ask most about searching and booking with My Trip."
      />

      <div className="mx-auto my-16 max-w-[820px] px-6 lg:my-20">
        <div className="divide-y divide-slate-200 overflow-hidden rounded-[2rem] border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group px-6 py-5 sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-900 marker:content-none dark:text-white">
                {faq.question}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7167FF]/10 text-[#7167FF] transition-transform duration-300 group-open:rotate-45">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Still stuck?{" "}
          <a
            href="/contact"
            className="font-semibold text-[#7167FF] transition-colors hover:text-[#5b52e0]"
          >
            Get in touch
          </a>
        </p>
      </div>
    </>
  );
}
