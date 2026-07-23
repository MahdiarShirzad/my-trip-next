import { apiRequest } from "@/lib/utils/apiClient";
import type { Hotel } from "@/types/hotel";

interface HotelsResponse {
  status: string;
  results: number;
  data: { hotels: Hotel[] };
}

export function getLatestHotels() {
  return apiRequest<HotelsResponse>("/hotels/latest", {
    next: { revalidate: 300 },
  } as RequestInit);
}

export function getAllHotels(searchParams?: Record<string, string>) {
  const query = searchParams ? `?${new URLSearchParams(searchParams)}` : "";
  return apiRequest<HotelsResponse>(`/hotels${query}`, {
    next: { revalidate: 300 },
  } as RequestInit);
}

export function getHotel(idOrSlug: string) {
  return apiRequest<{ status: string; data: { hotel: Hotel } }>(
    `/hotels/${idOrSlug}`,
    { next: { revalidate: 300 } } as RequestInit,
  );
}
