export default function ConfirmationHeader({ isFlight }: { isFlight: boolean }) {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 pt-24 pb-4 rounded-b-[1.5rem] transition-colors duration-300" />

      <div className="mx-auto max-w-[1320px] px-6 pt-10 pb-6 text-center">
        <span className="mb-4 inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/25 px-4 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Payment Successful
        </span>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Your {isFlight ? "Flight" : "Stay"} Is{" "}
          <span className="text-[#7167FF]">Confirmed</span>
        </h1>

        <p className="mx-auto max-w-xl text-base text-slate-600 dark:text-slate-400 sm:text-lg">
          {isFlight
            ? "Your seat is booked and your payment went through. Details are below."
            : "Your room is booked and your payment went through. Details are below."}
        </p>
      </div>
    </div>
  );
}
