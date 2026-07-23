import type { Flight } from "@/types/flight";
import { apiRequest } from "../utils/apiClient";

interface FlightsResponse {
  status: string;
  results: number;
  data: { flights: Flight[] };
}

export function getLatestFlights() {
  return apiRequest<FlightsResponse>("/flights/latest", {
    next: { revalidate: 3600 },
  } as RequestInit);
}

export function getAllFlights(searchParams?: Record<string, string>) {
  const query = searchParams ? `?${new URLSearchParams(searchParams)}` : "";
  return apiRequest<FlightsResponse>(`/flights${query}`, {
    next: { revalidate: 3600 },
  } as RequestInit);
}

export function getFlight(idOrSlug: string) {
  return apiRequest<{ status: string; data: { flight: Flight } }>(
    `/flights/${idOrSlug}`,
    { next: { revalidate: 3600 } } as RequestInit,
  );
}
