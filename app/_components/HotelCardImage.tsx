export default function HotelCardImage({
  src,
  alt,
  isFullyBooked,
}: {
  src: string;
  alt: string;
  isFullyBooked?: boolean;
}) {
  return (
    <div className="relative w-full h-[180px] overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
          isFullyBooked ? "grayscale" : "group-hover:scale-105"
        }`}
      />

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/90 to-transparent dark:from-slate-800/90" />

      {isFullyBooked && (
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
          <span className="font-interSemiBold text-xs tracking-wide uppercase text-white bg-slate-900/80 px-3 py-1.5 rounded-full">
            Sold out
          </span>
        </div>
      )}
    </div>
  );
}
