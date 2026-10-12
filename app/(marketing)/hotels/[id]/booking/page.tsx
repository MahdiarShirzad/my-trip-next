import { notFound } from "next/navigation";
import HotelBookingHeader from "../../_components/HotelBookingHeader";
import HotelBookingClient from "../../_components/HotelBookingClient";
import type { Metadata } from "next";
import { getHotelForBooking } from "@/lib/services/apiHotels";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await getHotelForBooking(id);
  const hotel = res?.data?.hotel;

  if (!hotel) {
    return { title: "Hotel Not Found" };
  }

  return {
    title: `Booking ${hotel.name} | ${hotel.location.city}`,
    description: `Book ${hotel.name} in ${hotel.location.city}. ${hotel.starRating}-star hotel with prices starting from ${hotel.minPrice}.`,
    // Transactional booking step — keep it out of the search index.
    robots: { index: false, follow: false },
    openGraph: {
      title: `Booking ${hotel.name} | ${hotel.location.city}`,
      description: `Book ${hotel.name} in ${hotel.location.city}. ${hotel.starRating}-star hotel with prices starting from ${hotel.minPrice}.`,
      siteName: "My Trip",
      type: "website",
      locale: "en_US",
    },
  };
}

interface HotelBookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelBookingPage({
  params,
}: HotelBookingPageProps) {
  const { id } = await params;
  const res = await getHotelForBooking(id);
  const hotel = res?.data?.hotel;

  if (!hotel) {
    notFound();
  }

  return (
    <>
      <HotelBookingHeader />
      <div className="mx-auto my-16 max-w-[1320px] px-6 lg:my-20">
        <HotelBookingClient hotel={hotel} />
      </div>
    </>
  );
}
