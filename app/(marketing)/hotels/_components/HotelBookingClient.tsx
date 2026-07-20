"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import BookingPersonalInfo, {
  BookingInfoValues,
} from "@/app/_components/BookingPersonalInfo";
import { HotelDetail } from "../hotel-booking";
import { confirmHotelBooking } from "../actions";
import RoomMap from "./RoomMap";
import HotelBookingSummary from "./HotelBookingSummary";
import NightsCounter from "./NightsCounter";

interface HotelBookingClientProps {
  hotel: HotelDetail;
  currentUser: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
}

export default function HotelBookingClient({
  hotel,
  currentUser,
}: HotelBookingClientProps) {
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string | null>(
    null,
  );
  const [nights, setNights] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRoom = useMemo(
    () => hotel.rooms.find((r) => r.roomNumber === selectedRoomNumber) ?? null,
    [hotel.rooms, selectedRoomNumber],
  );

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
      const checkInDate = new Date();
      const checkOutDate = new Date(checkInDate.getTime() + nights * 86400000);

      const result = await confirmHotelBooking({
        hotelId: hotel._id,
        roomNumber: selectedRoom.roomNumber,
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
        checkInDate: checkInDate.toISOString().split("T")[0],
        checkOutDate: checkOutDate.toISOString().split("T")[0],
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
            ...currentUser,
            nationalId: "",
          }}
          disabled={!selectedRoom}
          isSubmitting={isSubmitting}
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
