import Image from "next/image";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

const COMPANY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Flights", href: "/flights" },
  { label: "Hotels", href: "/hotels" },
  { label: "Contact", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7167FF]/10 blur-3xl dark:bg-[#7167FF]/20"
      />

      <div className="container relative mx-auto max-w-[1320px] px-6 pb-8 pt-20 sm:px-10 lg:px-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="relative block h-9 w-40">
                <Image
                  src="/images/logo-dark.png"
                  alt="MyTrip"
                  fill
                  className="object-contain object-left dark:hidden"
                />
                <Image
                  src="/images/logo.png"
                  alt="MyTrip"
                  fill
                  className="hidden object-contain object-left dark:block"
                />
              </span>
            </Link>

            <p className="mt-5 max-w-xs font-inter text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Find and book flights and hotels in a few taps — clear prices, no
              surprises.
            </p>

            <div className="mt-7 flex flex-col gap-3.5">
              <ContactRow icon={<PhoneIcon className="h-4 w-4" />}>
                <a
                  href="tel:+989384494884"
                  className="hover:text-[#7167FF] transition-colors"
                >
                  +98 938 449 4884
                </a>
                <span className="block text-xs text-slate-400 dark:text-slate-500">
                  24/7 support
                </span>
              </ContactRow>
              <ContactRow icon={<MailIcon className="h-4 w-4" />}>
                <a
                  href="mailto:mahdiar55582@gmail.com"
                  className="hover:text-[#7167FF] transition-colors"
                >
                  mahdiar55582@gmail.com
                </a>
              </ContactRow>
              <ContactRow icon={<PinIcon className="h-4 w-4" />}>
                Mazandaran, Sari, Iran
              </ContactRow>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <SocialLink href="https://t.me/mahdyarshirzad" label="Telegram">
                <TelegramIcon className="h-4 w-4" />
              </SocialLink>

              <SocialLink
                href="https://www.linkedin.com/in/mahdyar-shirzad-a72873280/"
                label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </SocialLink>

              <SocialLink
                href="https://github.com/MahdiarShirzad"
                label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
          <FooterLinkGroup title="Support" links={SUPPORT_LINKS} />

          <div>
            <p className="font-interBold text-sm uppercase tracking-wide text-slate-800 dark:text-slate-100">
              Stay in the loop
            </p>
            <p className="mt-4 font-inter text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Fare drops and trip ideas, straight to your inbox. No spam.
            </p>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pl-3 dark:border-slate-700 dark:bg-slate-800">
              <MailIcon className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent py-1.5 font-inter text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7167FF] text-white transition-colors hover:bg-[#5b52e0]"
              >
                <SendIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="my-10 flex items-center">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7167FF]" />
          <span className="mx-1 h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-700" />
          <PlaneIcon className="w-4 shrink-0 rotate-90 text-[#7167FF]" />
          <span className="mx-1 h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-700" />
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f96768]" />
        </div>

        <div className="flex flex-col-reverse items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-inter text-xs text-slate-400 dark:text-slate-500">
            © {year}{" "}
            <span className="font-interSemiBold text-[#7167FF]">MyTrip</span>.
            All rights reserved.
          </p>
          <div className="flex gap-5 font-inter text-xs text-slate-400 dark:text-slate-500">
            <Link
              href="/privacy-policy"
              className="hover:text-[#7167FF] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#7167FF] transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/faq"
              className="hover:text-[#7167FF] transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p className="font-interBold text-sm uppercase tracking-wide text-slate-800 dark:text-slate-100">
        {title}
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center gap-1.5 font-inter text-sm text-slate-500 transition-colors hover:text-[#7167FF] dark:text-slate-400"
            >
              <ArrowIcon className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7167FF]/10 text-[#7167FF] dark:bg-[#7167FF]/15">
        {icon}
      </span>
      <span className="pt-1 font-interSemiBold text-sm text-slate-600 dark:text-slate-300">
        {children}
      </span>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-[#7167FF] hover:text-[#7167FF] dark:border-slate-700 dark:text-slate-400"
    >
      {children}
    </a>
  );
}

/* --- icons ------------------------------------------------------------- */

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 6.5 12 13l9-6.5M4.5 19h15a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 19.5 5h-15A1.5 1.5 0 0 0 3 6.5v11A1.5 1.5 0 0 0 4.5 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="9.5"
        r="2.3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21 3 3 10.5l7.5 3M21 3l-7.5 18-3-7.5M21 3 10.5 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlaneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 16.5v-2l-8.5-5V4a1.5 1.5 0 0 0-3 0v5.5L2 14.5v2l8.5-2.6V19l-2.5 1.8V22l3.5-1 3.5 1v-1.2L12.5 19v-5.1l8.5 2.6Z" />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M14.9932 1.58221C15.0223 1.40736 14.9567 1.23016 14.8208 1.11645C14.6848 1.00274 14.4988 0.969519 14.3318 1.02914L0.331836 6.02914C0.143209 6.0965 0.0129867 6.26994 0.000913704 6.46987C-0.0111592 6.6698 0.0972469 6.85765 0.276398 6.94722L4.2764 8.94722C4.43688 9.02746 4.62806 9.01556 4.77735 8.91603L8.09775 6.70244L6.10957 9.18766C6.02203 9.29709 5.98442 9.43824 6.00592 9.57672C6.02742 9.7152 6.10605 9.8383 6.22265 9.91603L12.2227 13.916C12.3638 14.0101 12.5431 14.0262 12.6988 13.9588C12.8545 13.8914 12.9653 13.7496 12.9932 13.5822L14.9932 1.58221Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 192 192"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <rect
          width="132"
          height="132"
          x="30"
          y="30"
          stroke="currentColor"
          strokeWidth="12"
          rx="16"
        ></rect>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
          d="M66 86v44"
        ></path>
        <circle cx="66" cy="64" r="8" fill="currentColor"></circle>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="12"
          d="M126 130v-26c0-9.941-8.059-18-18-18v0c-9.941 0-18 8.059-18 18v26"
        ></path>
      </g>
    </svg>
  );
}

function GithubIcon({
  className = "w-8 h-8",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>github</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="invisible_box" data-name="invisible box">
            <rect width="48" height="48" fill="none"></rect>
            <rect width="48" height="48" fill="none"></rect>
          </g>
          <g id="icons_Q2" data-name="icons Q2">
            <path d="M24,1.9a21.6,21.6,0,0,0-6.8,42.2c1,.2,1.8-.9,1.8-1.8V39.4c-6,1.3-7.9-2.9-7.9-2.9a6.5,6.5,0,0,0-2.2-3.2C6.9,31.9,9,32,9,32a4.3,4.3,0,0,1,3.3,2c1.7,2.9,5.5,2.6,6.7,2.1a5.4,5.4,0,0,1,.5-2.9C12.7,32,9,28,9,22.6A10.7,10.7,0,0,1,11.9,15a6.2,6.2,0,0,1,.3-6.4,8.9,8.9,0,0,1,6.4,2.9,15.1,15.1,0,0,1,5.4-.8,17.1,17.1,0,0,1,5.4.7,9,9,0,0,1,6.4-2.8,6.5,6.5,0,0,1,.4,6.4A10.7,10.7,0,0,1,39,22.6C39,28,35.3,32,28.5,33.2a5.4,5.4,0,0,1,.5,2.9v6.2a1.8,1.8,0,0,0,1.9,1.8A21.7,21.7,0,0,0,24,1.9Z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}
