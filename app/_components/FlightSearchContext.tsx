"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CabinClass = "economy" | "business" | "first";

interface FlightSearchState {
  flightType: string;
  setFlightType: (v: string) => void;

  originCode: string;
  setOriginCode: (v: string) => void;
  originCity: string;
  setOriginCity: (v: string) => void;

  destinationCode: string;
  setDestinationCode: (v: string) => void;
  destinationCity: string;
  setDestinationCity: (v: string) => void;

  swapCities: () => void;

  journeyDate: Date;
  setJourneyDate: (v: Date) => void;
  returnDate: Date;
  setReturnDate: (v: Date) => void;

  adults: number;
  children: number;
  infants: number;
  classType: CabinClass;
  setClassType: (v: CabinClass) => void;
  changePassengerCount: (
    category: "adults" | "children" | "infants",
    delta: number,
  ) => void;
}

const FlightSearchContext = createContext<FlightSearchState | null>(null);

export function FlightSearchProvider({
  children: reactChildren,
}: {
  children: ReactNode;
}) {
  const [flightType, setFlightType] = useState<string>("One Way");

  const [originCode, setOriginCode] = useState<string>("");
  const [originCity, setOriginCity] = useState<string>("");
  const [destinationCode, setDestinationCode] = useState<string>("");
  const [destinationCity, setDestinationCity] = useState<string>("");

  const [journeyDate, setJourneyDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d;
  });

  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [classType, setClassType] = useState<CabinClass>("economy");

  function swapCities() {
    setOriginCode(destinationCode);
    setOriginCity(destinationCity);
    setDestinationCode(originCode);
    setDestinationCity(originCity);
  }

  function changePassengerCount(
    category: "adults" | "children" | "infants",
    delta: number,
  ) {
    if (category === "adults") setAdults((n) => Math.max(n + delta, 1));
    if (category === "children") setChildren((n) => Math.max(n + delta, 0));
    if (category === "infants") setInfants((n) => Math.max(n + delta, 0));
  }

  const value: FlightSearchState = {
    flightType,
    setFlightType,
    originCode,
    setOriginCode,
    originCity,
    setOriginCity,
    destinationCode,
    setDestinationCode,
    destinationCity,
    setDestinationCity,
    swapCities,
    journeyDate,
    setJourneyDate,
    returnDate,
    setReturnDate,
    adults,
    children,
    infants,
    classType,
    setClassType,
    changePassengerCount,
  };

  return (
    <FlightSearchContext.Provider value={value}>
      {reactChildren}
    </FlightSearchContext.Provider>
  );
}

export function useFlightSearch() {
  const ctx = useContext(FlightSearchContext);
  if (!ctx) {
    throw new Error(
      "useFlightSearch must be used within a FlightSearchProvider",
    );
  }
  return ctx;
}
