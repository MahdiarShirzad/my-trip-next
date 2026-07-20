import FlightBookingHeader from "@/app/(marketing)/flights/[id]/booking/_components/FlightBookingHeader";
import { FlightDetail } from "./flight-booking";
import FlightBookingClient from "@/app/(marketing)/flights/[id]/booking/_components/FlightBookingClient";
import { mockFlights } from "@/types/mock-flights";
import { notFound } from "next/navigation";

async function getFlightById(id: string): Promise<FlightDetail | null> {
  const flight = mockFlights.find((f) => String(f._id) === String(id));
  return flight ? (flight as FlightDetail) : null;
}

async function getCurrentUser() {
  return {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  };
}

interface FlightBookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function FlightBookingPage({
  params,
}: FlightBookingPageProps) {
  const { id } = await params;

  const flight = await getFlightById(id);

  if (!flight) {
    notFound();
  }

  const currentUser = await getCurrentUser();

  return (
    <>
      <FlightBookingHeader />

      <div className="mx-auto my-16 max-w-[1320px] px-6 lg:my-20">
        <FlightBookingClient flight={flight} currentUser={currentUser} />
      </div>
    </>
  );
}
