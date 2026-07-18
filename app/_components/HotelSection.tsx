import { sampleHotels } from "@/types/hotel";
import Title from "./Title";
import HotelCardSkeleton from "./HotelCardSekeleton";
import HotelCarousel from "./HotelCarousel";
import HotelCard from "./HotelCard";

const SKELETON_COUNT = 4;

export default function HotelSection() {
  // Sample data stands in for the real fetch for now.
  const isLoading = false;
  const data = sampleHotels;

  return (
    <div className="py-20 mt-10 bg-slate-200 dark:bg-gray-700">
      <div className="container max-w-[1520px] mx-auto max-md:px-1 max-sm:px-14">
        <Title
          title="HOTEL"
          desc="Our Most Popular Hotels"
          isCommentTitle={false}
        />
        <div className="lg:px-24 md:px-14 max-md:w-full relative z-40 max-lg:w-5/6 max-lg:mx-auto">
          {isLoading ? (
            <div className="flex gap-8 items-center justify-center flex-wrap pt-7">
              {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <HotelCarousel>
              {data.slice(-6).map((hotel) => (
                <HotelCard data={hotel} key={hotel._id} />
              ))}
            </HotelCarousel>
          ) : (
            <p className="text-4xl font-interBlack text-center my-20 text-slate-800 dark:text-slate-300">
              No Hotel Found ...!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
