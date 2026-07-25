import type { Flight } from "@/types/flight";
import { apiRequest } from "../utils/apiClient";
import { CabinClass } from "@/app/_components/FlightSearchContext";

interface FlightsResponse {
  status: string;
  results: number;
  data: { flights: Flight[] };
}

export interface FlightSearchFormValues {
  flightType: string;
  originCode: string;
  destinationCode: string;
  journeyDate: Date;
  returnDate: Date;
  adults: number;
  children: number;
  infants: number;
  classType: CabinClass;
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function buildFlightSearchParams(
  values: FlightSearchFormValues,
): Record<string, string> {
  const params: Record<string, string> = {
    "origin.code": values.originCode,
    "destination.code": values.destinationCode,
    departureDate: toISODate(values.journeyDate),
    adults: String(values.adults),
    children: String(values.children),
    infants: String(values.infants),
    class: values.classType,
  };

  if (values.flightType === "Round Way") {
    params.returnDate = toISODate(values.returnDate);
  }

  return params;
}

const BACKEND_QUERY_KEYS = [
  "origin.code",
  "destination.code",
  "departureDate",
  "sort",
  "page",
  "limit",
  "fields",
] as const;

export function buildBackendFlightQuery(
  searchParams: Record<string, string | string[] | undefined>,
): Record<string, string> {
  const query: Record<string, string> = {};

  for (const key of BACKEND_QUERY_KEYS) {
    const value = searchParams[key];
    if (typeof value === "string" && value.length > 0) {
      query[key] = value;
    }
  }

  return query;
}

export function getLatestFlights() {
  return apiRequest<FlightsResponse>("/flights/latest", {
    next: { revalidate: 300 },
  } as RequestInit);
}

export function getAllFlights(searchParams?: Record<string, string>) {
  const query = searchParams ? `?${new URLSearchParams(searchParams)}` : "";
  return apiRequest<FlightsResponse>(`/flights${query}`, {
    next: { revalidate: 300 },
  } as RequestInit);
}

export function getFlight(idOrSlug: string) {
  return apiRequest<{ status: string; data: { flight: Flight } }>(
    `/flights/${idOrSlug}`,
    { next: { revalidate: 300 } } as RequestInit,
  );
}

export function getFlightForBooking(idOrSlug: string) {
  return apiRequest<{ status: string; data: { flight: Flight } }>(
    `/flights/${idOrSlug}`,
    { cache: "no-store" } as RequestInit,
  );
}
