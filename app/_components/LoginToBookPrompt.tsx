import Link from "next/link";

export default function LoginToBookPrompt() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-lg font-extrabold text-slate-900 dark:text-white">
        Sign in to complete your booking
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        You need to be logged in to enter your details and confirm this
        reservation.
      </p>
      <Link
        href="/login"
        className="mt-5 inline-flex items-center justify-center rounded-full bg-[#7167FF] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5b51e6]"
      >
        Go to Login
      </Link>
    </div>
  );
}
