"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import SeatMap from "@/app/(marketing)/flights/[id]/booking/_components/SeatMap";
import FlightBookingSummary from "@/app/(marketing)/flights/[id]/booking/_components/FlightBookingSummary";
import BookingPersonalInfo, {
  BookingInfoValues,
} from "@/app/_components/BookingPersonalInfo";
import LoginToBookPrompt from "@/app/_components/LoginToBookPrompt";
import { FlightDetail } from "../flight-booking";
import { confirmFlightBooking } from "../actions";
import { useAuth } from "@/app/_components/AuthProvider";
import { setNationalId, updateProfile } from "@/lib/services/apiAuth";
import { createFlightBooking } from "@/lib/services/apiBookings";
import { ApiError } from "@/lib/utils/apiClient";
import { confirmPayment, initiatePayment } from "@/lib/services/apiPayments";
import { useRouter } from "next/navigation";

export interface CurrentUser {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface FlightBookingClientProps {
  flight: FlightDetail | null;
  currentUser?: CurrentUser;
}

export default function FlightBookingClient({
  flight,
  currentUser,
}: FlightBookingClientProps) {
  const { user, setUser } = useAuth();
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const selectedSeat = useMemo(
    () =>
      flight?.seats.find((s) => s.seatNumber === selectedSeatNumber) ?? null,
    [flight, selectedSeatNumber],
  );

  if (!flight) {
    return null;
  }

  const hasNationalId = Boolean(user?.nationalId);

  function handleSelectSeat(seatNumber: string) {
    setSelectedSeatNumber((current) =>
      current === seatNumber ? null : seatNumber,
    );
  }

  async function handleSubmit(values: BookingInfoValues) {
    if (!flight || !user) {
      return;
    }

    if (!selectedSeat) {
      toast.error("Please select a seat first!");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!hasNationalId && values.nationalId) {
        const idRes = await setNationalId(values.nationalId);
        if (idRes?.data?.user) setUser(idRes.data.user);
      }
      if (values.address && values.address !== user.address) {
        const profileRes = await updateProfile({ address: values.address });
        if (profileRes?.data?.user) setUser(profileRes.data.user);
      }

      const bookingRes = await createFlightBooking({
        flightId: flight._id,
        travelDate: flight.departureTime,
        passengers: [
          {
            name: values.fullName,
            email: values.email,
            phone: values.phone,
            nationalId: values.nationalId ?? "",
            seatNumber: selectedSeat.seatNumber,
          },
        ],
      });

      const booking = bookingRes?.data?.booking;
      if (!booking) {
        toast.error("Booking failed, please try again.");
        return;
      }

      const initRes = await initiatePayment(booking._id);
      const transactionId = initRes?.data?.payment?.transactionId;

      if (transactionId) {
        await confirmPayment(transactionId);
      }

      router.push(`/booking-confirmation?bookingId=${booking._id}&type=flight`);
    } catch (err) {
      toast.error(
        err instanceof ApiError
          ? err.message
          : "Something went wrong, please try again.",
      );
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

        {user ? (
          <BookingPersonalInfo
            initialValues={{
              fullName: user.name ?? "",
              email: user.email,
              phone: user.phone ?? "",
              address: user.address ?? "",
              nationalId: user.nationalId ?? "",
            }}
            disabled={!selectedSeat}
            isSubmitting={isSubmitting}
            nationalIdLocked={hasNationalId}
            onSubmit={handleSubmit}
          />
        ) : (
          <LoginToBookPrompt />
        )}
      </div>

      <div className="w-2/5 max-lg:w-full">
        <FlightBookingSummary flight={flight} selectedSeat={selectedSeat} />
      </div>
    </div>
  );
}
