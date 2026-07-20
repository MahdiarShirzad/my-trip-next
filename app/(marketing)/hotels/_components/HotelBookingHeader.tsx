export default function HotelBookingHeader() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 pt-24 pb-4 rounded-b-[1.5rem] transition-colors duration-300" />

      <div className="mx-auto max-w-[1320px] px-6 pt-10 pb-6 text-center">
        <span className="mb-4 inline-flex items-center rounded-full bg-[#7167FF]/10 border border-[#7167FF]/25 px-4 py-1 text-xs font-semibold text-[#7167FF] dark:text-[#b8b3ff]">
          Book Your Stay
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Choose Your <span className="text-[#7167FF]">Perfect Room</span>
        </h1>
      </div>
    </div>
  );
}
