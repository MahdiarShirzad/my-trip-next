"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import BookingPersonalInfo, {
  BookingInfoValues,
} from "@/app/_components/BookingPersonalInfo";
import { HotelDetail } from "../hotel-booking";
import RoomMap from "./RoomMap";
import HotelBookingSummary from "./HotelBookingSummary";
import NightsCounter from "./NightsCounter";
import { useAuth } from "@/app/_components/AuthProvider";
import { setNationalId, updateProfile } from "@/lib/services/apiAuth";
import { createHotelBooking } from "@/lib/services/apiBookings";
import { initiatePayment, confirmPayment } from "@/lib/services/apiPayments";
import { ApiError } from "@/lib/utils/apiClient";

interface HotelBookingClientProps {
  hotel: HotelDetail;
}

export default function HotelBookingClient({ hotel }: HotelBookingClientProps) {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string | null>(
    null,
  );
  const [nights, setNights] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRoom = useMemo(
    () => hotel.rooms.find((r) => r.roomNumber === selectedRoomNumber) ?? null,
    [hotel.rooms, selectedRoomNumber],
  );

  if (!user) return null;

  const hasNationalId = Boolean(user.nationalId);

  function handleSelectRoom(roomNumber: string) {
    setSelectedRoomNumber((current) =>
      current === roomNumber ? null : roomNumber,
    );
  }

  async function handleSubmit(values: BookingInfoValues) {
    if (!selectedRoom) {
      toast.error("Please select a room first!");
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

      const checkInDate = new Date();
      const checkOutDate = new Date(checkInDate.getTime() + nights * 86400000);

      const bookingRes = await createHotelBooking({
        hotelId: hotel._id,
        roomNumbers: [selectedRoom.roomNumber],
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
        roomType: selectedRoom.roomType,
        guests: [
          {
            name: values.fullName,
            email: values.email,
            phone: values.phone,
            nationalId: values.nationalId ?? "",
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

      router.push(`/booking-confirmation?bookingId=${booking._id}&type=hotel`);
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
            Choose Your Room
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {hotel.availableRooms} rooms available
          </p>
          <div className="mt-6">
            <RoomMap
              rooms={hotel.rooms}
              selectedRoom={selectedRoomNumber}
              onSelect={handleSelectRoom}
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <p className="mb-4 text-xl font-extrabold text-slate-900 dark:text-white">
            Stay Duration
          </p>
          <NightsCounter nights={nights} onChange={setNights} />
        </div>

        <BookingPersonalInfo
          initialValues={{
            fullName: user.name ?? "",
            email: user.email,
            phone: user.phone ?? "",
            address: user.address ?? "",
            nationalId: user.nationalId ?? "",
          }}
          disabled={!selectedRoom}
          isSubmitting={isSubmitting}
          nationalIdLocked={hasNationalId}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="w-2/5 max-lg:w-full">
        <HotelBookingSummary
          hotel={hotel}
          selectedRoom={selectedRoom}
          nights={nights}
        />
      </div>
    </div>
  );
}
