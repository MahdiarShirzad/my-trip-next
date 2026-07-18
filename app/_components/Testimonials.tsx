"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { testimonials } from "@/types/testimonials";
import TestimonialCard from "./TestimonialCard";
import CarouselArrow from "./CarouselArrow";
import CarouselIndicators from "./CarouselIndicators";
import Title from "./Title";

const AUTOPLAY_INTERVAL_MS = 3500;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  // How many slides are visible at once, kept in sync with the slider's
  // own breakpoints so we can tell which slide is the visually-centered one.
  const [perView, setPerView] = useState(1);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 480px)": {
        slides: { perView: 1.15, spacing: 16 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2.15, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 28 },
      },
    },
    slideChanged(slider) {
      setCurrent(slider.track.details.rel);
    },
    detailsChanged(slider) {
      const rounded = Math.round(
        (slider.options.slides?.perView as number) ?? 1,
      );
      setPerView(rounded);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [instanceRef]);

  // The visually-centered slide is the middle one of the visible set,
  // not simply the leftmost visible slide (which is what `current` tracks).
  const centeredOffset = Math.floor(perView / 2);
  const centeredIndex = (current + centeredOffset) % testimonials.length;

  return (
    <section className="py-20 ">
      <div className="max-w-[1200px] mx-auto px-4">
        <Title
          title="TESTIMONIALS"
          desc="What Our Users Say"
          isCommentTitle={false}
        />
        <p className="text-center -mt-3 mb-10 font-inter text-sm text-slate-400 dark:text-slate-500">
          Real feedback from our travelers
        </p>

        {/* w-full is required here: CarouselArrow uses left-0/right-0 to
            anchor to this box's edges, so this wrapper must span the full
            row width, not just shrink to its content. */}
        <div className="relative w-full">
          <CarouselArrow
            direction="prev"
            onClick={() => instanceRef.current?.prev()}
          />

          {/* px-14/16 clears the 56px (w-14) arrow buttons on mobile so the
              card never runs underneath them; md: reverts to a smaller inset
              since the track has more room to work with there. */}
          <div className="overflow-hidden px-14 sm:px-16 md:px-4">
            <div ref={sliderRef} className="keen-slider py-2">
              {testimonials.map((item, i) => (
                <div key={item.id} className="keen-slider__slide">
                  <TestimonialCard item={item} active={i === centeredIndex} />
                </div>
              ))}
            </div>
          </div>

          <CarouselArrow
            direction="next"
            onClick={() => instanceRef.current?.next()}
          />
        </div>

        <CarouselIndicators
          count={testimonials.length}
          current={current}
          onSelect={(idx) => instanceRef.current?.moveToIdx(idx)}
        />
      </div>
    </section>
  );
}
