"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomRightArrow from "./CustomRightArrow";
import CustomLeftArrow from "./CustomLeftArrow";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1325 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1324, min: 1125 },
    items: 3,
  },
  littleTablet: {
    breakpoint: { max: 1124, min: 700 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 699, min: 0 },
    items: 1,
  },
};

export default function HotelCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={false}
      dotListClass="custom-dot-list-style"
      arrows={true}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {children}
    </Carousel>
  );
}
