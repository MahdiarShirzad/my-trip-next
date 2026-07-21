import type { ReactNode } from "react";

const SEARCH_FILTERS = [
  "Departure and arrival time",
  "Number of stops — nonstop, one-stop, or two-stop flights",
  "Layover duration, including the option to avoid long layovers",
  "Cabin class (economy, business, first)",
  "Preferred airline or alliance",
  "Baggage allowance",
  "Total trip duration",
  "Price range, so you can stay within budget",
];

export default function FlightSeoContent() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-[760px]">
        {/* Masthead */}
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-[#7167FF]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#7167FF]">
              About MyTrip
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Your Trusted Partner for Online Flight Booking
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            MyTrip is a leading online travel platform built to make booking
            flights simple, fast, and reliable. From day one, our mission has
            been to give travelers a smooth way to search, compare, and book
            flights without the hassle of traditional booking channels. Over
            time we&apos;ve grown into a platform trusted by thousands of
            travelers who return to us for every trip, thanks to transparent
            pricing, instant confirmations, and round-the-clock support.
          </p>
        </div>

        {/* Customer journey */}
        <div>
          <Section
            icon={<ShieldCheckIcon />}
            title="Why Book Your Flight with MyTrip"
          >
            Booking with MyTrip means booking with confidence. Just enter your
            origin, destination, and travel dates, hit search, and instantly
            compare flights from dozens of airlines. To help you narrow down the
            best option, MyTrip gives you a set of smart tools built right into
            the search experience.
          </Section>

          <Section icon={<CalendarIcon />} title="Price Calendar">
            See how fares shift in the days before and after your chosen date.
            If your travel dates are flexible, the price calendar helps you spot
            cheaper days at a glance and book the most cost-effective option for
            your trip.
          </Section>

          <Section icon={<SlidersIcon />} title="Advanced Search Filters">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Fine-tune your results with filters for:
            </p>
            <div className="mt-4 rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-5 dark:border-slate-700 dark:bg-slate-900/60">
              <div className="flex flex-wrap gap-2">
                {SEARCH_FILTERS.map((filter) => (
                  <span
                    key={filter}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-[#7167FF]" />
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </Section>

          <Section icon={<CreditCardIcon />} title="Secure, Easy Payment">
            Pay safely with all major credit and debit cards. Once your payment
            is confirmed, your e-ticket is issued instantly and sent straight to
            your email, no waiting, no paperwork.
          </Section>

          <Section icon={<PlaneIcon />} title="Fly with Airlines You Trust">
            MyTrip partners with major international carriers, giving you the
            freedom to choose based on price, comfort, or schedule, whether
            that&apos;s a budget-friendly option or a full-service airline with
            extra legroom and in-flight amenities. Every airline on our platform
            is vetted for reliability, so you can book knowing your flight is in
            good hands.
          </Section>

          <Section
            icon={<GlobeIcon />}
            title="Book Flights to Destinations Worldwide"
          >
            Whether you&apos;re planning a quick regional trip or a long-haul
            journey across continents, MyTrip covers routes to major cities and
            hidden gems alike. Search flights to top destinations or explore new
            ones, all bookable in just a few clicks.
          </Section>

          <Section
            icon={<RefreshIcon />}
            title="Flexible Cancellations & Refunds"
          >
            Plans change, and we get it. If your travel dates shift or your trip
            falls through, you can cancel your flight online through your MyTrip
            account, subject to the airline&apos;s fare rules. Approved refunds
            are processed quickly, straight back to your original payment
            method.
          </Section>

          <Section
            icon={<HeadsetIcon />}
            title="Support Whenever You Need It"
            isLast
          >
            Our support team is available 24/7, through live chat, email, or
            phone, for anything from booking questions to last-minute changes.
            Book from your phone, tablet, or desktop, or download the MyTrip app
            for a faster experience on the go.
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({
  icon,
  title,
  isLast = false,
  children,
}: {
  icon: ReactNode;
  title: string;
  isLast?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-[#7167FF] dark:border-slate-700 dark:bg-slate-950">
          {icon}
        </div>
        {!isLast && (
          <div
            aria-hidden="true"
            className="my-1 w-px flex-1 bg-slate-200 dark:bg-slate-700"
          />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-10 last:pb-0">
        <h3 className="pt-1.5 text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h3>
        {typeof children === "string" ? (
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {children}
          </p>
        ) : (
          <div className="mt-3">{children}</div>
        )}
      </div>
    </div>
  );
}

function CheckIcon({
  className = "mt-0.5 h-4 w-4 flex-shrink-0 text-[#7167FF]",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h9M17 7h3M4 12h3M9 12h11M4 17h13M19 17h1" />
      <circle cx="13" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="7" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CreditCardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19M6 14.5h4" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.8 2.6 2.8 14.4 0 17M12 3.5c-2.8 2.6-2.8 14.4 0 17" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66" />
      <path d="M17.5 4.5v4h-4M6.5 19.5v-4h4" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 13v-1a7.5 7.5 0 0115 0v1" />
      <rect x="2.5" y="13" width="4.5" height="6.5" rx="1.8" />
      <rect x="17" y="13" width="4.5" height="6.5" rx="1.8" />
      <path d="M19.25 19.5a3.5 3.5 0 01-3.5 3.5h-1.5" />
    </svg>
  );
}
