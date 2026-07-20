// import { sampleHotels } from "@/types/hotel";
import Title from "./Title";
import HotelCardSkeleton from "./HotelCardSkeleton";
import HotelCard from "./HotelCard";
import { mockHotels } from "./mockHotels";

const SKELETON_COUNT = 4;

export default function HotelSection() {
  const isLoading = false;
  const data = mockHotels;

  return (
    <div className="w-full shrink-0 py-20 mt-10 bg-slate-200 dark:bg-gray-700">
      <div className="container max-w-[1320px] mx-auto">
        <Title
          title="HOTEL"
          desc="Our Most Popular Hotels"
          isCommentTitle={false}
        />
        <div className="flex gap-8 items-center justify-center pt-7 flex-wrap max-lg:px-10">
          {isLoading ? (
            Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <HotelCardSkeleton key={index} />
            ))
          ) : data && data.length > 0 ? (
            data.map((hotel) => <HotelCard data={hotel} key={hotel._id} />)
          ) : (
            <p className="text-4xl font-interBlack text-center my-20 w-full text-slate-800 dark:text-slate-300">
              No Hotel Found ...!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
