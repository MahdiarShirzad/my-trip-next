import { notFound } from "next/navigation";
import { HotelDetail } from "../../hotel-booking";
import HotelBookingHeader from "../../_components/HotelBookingHeader";
import HotelBookingClient from "../../_components/HotelBookingClient";
import { mockHotels } from "@/app/_components/mockHotels";

// TODO: replace with a real fetch against your hotels API
async function getHotelById(id: string): Promise<HotelDetail | null> {
  const hotel = mockHotels.find((h) => h._id === id);
  return hotel ? (hotel as HotelDetail) : null;
}

// TODO: replace with your real auth/session lookup
async function getCurrentUser() {
  return {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  };
}

interface HotelBookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelBookingPage({
  params,
}: HotelBookingPageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);
  const currentUser = await getCurrentUser();

  if (!hotel) {
    notFound();
  }

  return (
    <>
      <HotelBookingHeader />

      <div className="mx-auto my-16 max-w-[1320px] px-6 lg:my-20">
        <HotelBookingClient hotel={hotel} currentUser={currentUser} />
      </div>
    </>
  );
}
