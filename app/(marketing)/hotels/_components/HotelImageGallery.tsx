import Image from "next/image";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import HotelImageLightbox from "./HotelImageLightbox";

export default function HotelImageGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrent(slider.track.details.rel);
    },
  });

  return (
    <>
      <div className="group relative mt-4 h-40 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <div ref={sliderRef} className="keen-slider h-full w-full">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCurrent(i);
                setIsLightboxOpen(true);
              }}
              className="keen-slider__slide relative block h-full w-full cursor-zoom-in"
              aria-label={`View photo ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${alt} photo ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
                sizes="400px"
              />
            </button>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronIcon className="h-3.5 w-3.5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronIcon className="h-3.5 w-3.5" />
            </button>

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isLightboxOpen && (
        <HotelImageLightbox
          images={images}
          initialIndex={current}
          alt={alt}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
