"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import SeatMap from "@/app/_components/SeatMap";
import FlightBookingSummary from "@/app/_components/FlightBookingSummary";
import BookingPersonalInfo, {
  BookingInfoValues,
} from "@/app/_components/BookingPersonalInfo";
import { FlightDetail } from "../(marketing)/flights/[id]/booking/flight-booking";
import { confirmFlightBooking } from "../(marketing)/flights/[id]/booking/actions";

interface FlightBookingClientProps {
  flight: FlightDetail | null;
  currentUser: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export default function FlightBookingClient({
  flight,
  currentUser,
}: FlightBookingClientProps) {
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSeat = useMemo(
    () =>
      flight?.seats.find((s) => s.seatNumber === selectedSeatNumber) ?? null,
    [flight, selectedSeatNumber],
  );

  if (!flight) {
    return null;
  }

  function handleSelectSeat(seatNumber: string) {
    setSelectedSeatNumber((current) =>
      current === seatNumber ? null : seatNumber,
    );
  }

  async function handleSubmit(values: BookingInfoValues) {
    if (!selectedSeat) {
      toast.error("Please select a seat first!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await confirmFlightBooking({
        flightId: flight._id,
        seatNumber: selectedSeat.seatNumber,
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
      });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-start gap-8 max-lg:flex-wrap-reverse">
      <div className="w-3/5 space-y-8 max-lg:w-full">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">
            Choose Your Seat
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {flight.availableSeats} seats available on this flight
          </p>
          <div className="mt-6">
            <SeatMap
              seats={flight.seats}
              selectedSeat={selectedSeatNumber}
              onSelect={handleSelectSeat}
            />
          </div>
        </div>

        <BookingPersonalInfo
          initialValues={currentUser}
          disabled={!selectedSeat}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="w-2/5 max-lg:w-full">
        <FlightBookingSummary flight={flight} selectedSeat={selectedSeat} />
      </div>
    </div>
  );
}
