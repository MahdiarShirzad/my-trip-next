import Image from "next/image";
import type { Testimonial } from "@/types/testimonials";
import StarRating from "./StarRating";

export default function TestimonialCard({
  item,
  active,
}: {
  item: Testimonial;
  active: boolean;
}) {
  return (
    <div
      className={`relative h-full p-7 pt-9 rounded-3xl transition-all duration-500 ${
        active ? "scale-100 opacity-100" : "scale-[0.94] opacity-60"
      } bg-white shadow-lg shadow-slate-200/70 dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-white/10`}
    >
      {/* Decorative quote mark */}
      <svg
        viewBox="0 0 32 24"
        className="absolute top-5 right-6 w-9 h-9 text-[#7167FF]/15 dark:text-[#9b93ff]/20"
        fill="currentColor"
      >
        <path d="M0 24V13.6C0 6.4 4.4 1.2 12.4 0l1.6 3.6C9.2 4.8 6.8 7.6 6.4 11.6H12V24H0ZM18 24V13.6C18 6.4 22.4 1.2 30.4 0L32 3.6c-4.8 1.2-7.2 4-7.6 8H30V24H18Z" />
      </svg>

      <div className="flex items-center gap-3.5">
        <div className="relative w-12 h-12 rounded-full ring-2 ring-[#7167FF]/20 overflow-hidden shrink-0">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-interSemiBold text-sm text-[#2b2860] dark:text-white truncate">
            {item.name}
          </h3>
          <p className="font-inter text-xs text-slate-400">{item.role}</p>
        </div>
      </div>

      <p className="mt-4 font-inter text-sm leading-6 text-slate-600 dark:text-slate-300">
        {item.text}
      </p>

      <div className="mt-5 flex items-center gap-2">
        <StarRating rating={item.rating} />
        <span className="font-interSemiBold text-xs text-slate-400">
          {item.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
