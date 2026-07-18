export default function CarouselIndicators({
  count,
  current,
  onSelect,
}: {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-9">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          aria-label={`Go to testimonial ${idx + 1}`}
          className="relative h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 transition-all duration-300"
          style={{ width: current === idx ? "2.25rem" : "0.6rem" }}
        >
          {current === idx && (
            <span className="absolute inset-0 bg-[#7167FF] rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
