"use client";

interface NightsCounterProps {
  nights: number;
  onChange: (nights: number) => void;
  min?: number;
  max?: number;
}

export default function NightsCounter({
  nights,
  onChange,
  min = 1,
  max = 30,
}: NightsCounterProps) {
  function decrease() {
    if (nights > min) onChange(nights - 1);
  }

  function increase() {
    if (nights < max) onChange(nights + 1);
  }

  return (
    <div className="flex items-center justify-between rounded-2xl border-2 border-slate-200 px-4 py-3.5 dark:border-slate-700">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
        Number of Nights
      </span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={decrease}
          disabled={nights <= min}
          aria-label="Decrease nights"
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 text-slate-600 transition-colors hover:border-[#7167FF] hover:text-[#7167FF] disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:text-slate-300"
        >
          <MinusIcon />
        </button>

        <span className="w-6 text-center text-base font-extrabold text-slate-900 dark:text-white">
          {nights}
        </span>

        <button
          type="button"
          onClick={increase}
          disabled={nights >= max}
          aria-label="Increase nights"
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 text-slate-600 transition-colors hover:border-[#7167FF] hover:text-[#7167FF] disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:text-slate-300"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}
