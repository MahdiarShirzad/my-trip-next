import Image from "next/image";

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
      <Image
        src={src}
        alt={alt}
        fill
        sizes="305px"
        className={`object-cover transition-transform duration-500 ${
          isFullyBooked ? "grayscale" : "group-hover:scale-105"
        }`}
      />

      {/* fade into card body so the image doesn't cut off abruptly */}
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
