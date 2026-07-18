export default function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous testimonial" : "Next testimonial"}
      className={`absolute top-1/2 -translate-y-1/2 z-20 ${
        isPrev ? "left-0" : "right-0"
      } w-10 h-10 flex items-center justify-center rounded-full
      bg-white text-[#7167FF] shadow-md shadow-slate-200
      hover:bg-[#7167FF] hover:text-white hover:scale-110
      dark:bg-slate-800 dark:text-[#9b93ff] dark:shadow-none dark:ring-1 dark:ring-white/10
      dark:hover:bg-[#7167FF] dark:hover:text-white
      transition-all duration-200`}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <path
          d={isPrev ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
