"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { RoomType } from "@/types/hotel";

interface HotelSearchContextValue {
  destinationCity: string;
  setDestinationCity: (city: string) => void;

  checkInDate: Date | null;
  setCheckInDate: (date: Date) => void;
  checkOutDate: Date | null;
  setCheckOutDate: (date: Date) => void;

  adults: number;
  children: number;
  infants: number;
  changeGuestCount: (
    key: "adults" | "children" | "infants",
    delta: number,
  ) => void;

  roomNumber: number;
  changeRoomNumber: (delta: number) => void;

  roomType: RoomType;
  setRoomType: (type: RoomType) => void;
}

const HotelSearchContext = createContext<HotelSearchContextValue | null>(null);

export function HotelSearchProvider({
  children: providerChildren,
}: {
  children: ReactNode;
}) {
  const [destinationCity, setDestinationCity] = useState("");

  const [checkInDate, setCheckInDateState] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    const inThreeDays = new Date(today);
    inThreeDays.setDate(inThreeDays.getDate() + 3);
    setCheckInDateState(today);
    setCheckOutDate(inThreeDays);
  }, []);

  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [roomNumber, setRoomNumber] = useState(1);
  const [roomType, setRoomType] = useState<RoomType>("double");

  function changeGuestCount(
    key: "adults" | "children" | "infants",
    delta: number,
  ) {
    if (key === "adults") setAdults((n) => Math.max(n + delta, 1));
    if (key === "children") setChildrenCount((n) => Math.max(n + delta, 0));
    if (key === "infants") setInfants((n) => Math.max(n + delta, 0));
  }

  function changeRoomNumber(delta: number) {
    setRoomNumber((n) => Math.max(n + delta, 1));
  }

  function setCheckInDate(date: Date) {
    setCheckInDateState(date);
    if (checkOutDate && date >= checkOutDate) {
      const next = new Date(date);
      next.setDate(next.getDate() + 1);
      setCheckOutDate(next);
    }
  }

  return (
    <HotelSearchContext.Provider
      value={{
        destinationCity,
        setDestinationCity,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        adults,
        children: childrenCount,
        infants,
        changeGuestCount,
        roomNumber,
        changeRoomNumber,
        roomType,
        setRoomType,
      }}
    >
      {providerChildren}
    </HotelSearchContext.Provider>
  );
}

export function useHotelSearch() {
  const ctx = useContext(HotelSearchContext);
  if (!ctx) {
    throw new Error("useHotelSearch must be used within a HotelSearchProvider");
  }
  return ctx;
}
