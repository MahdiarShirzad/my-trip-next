import FlightBookingHeader from "@/app/(marketing)/flights/[id]/booking/_components/FlightBookingHeader";
import { FlightDetail } from "./flight-booking";
import FlightBookingClient from "@/app/(marketing)/flights/[id]/booking/_components/FlightBookingClient";
import { mockFlights } from "@/types/mock-flights";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getFlight } from "@/lib/services/apiFlights";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const flight = await getFlightById(id);

  if (!flight) {
    return {
      title: "Flight Not Found",
    };
  }

  return {
    title: `${flight.airline} ${flight.flightNumber} | ${flight.origin.city} → ${flight.destination.city}`,
    description: `Book flight ${flight.flightNumber} from ${flight.origin.city} to ${flight.destination.city}. Departure: ${new Date(
      flight.departureTime,
    ).toLocaleString()}`,
  };
}

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

  const res = await getFlight(id);

  const flight = res?.data?.flight;

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
