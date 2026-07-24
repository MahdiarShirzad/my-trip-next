import { apiRequest } from "@/lib/utils/apiClient";
import type { Hotel, RoomType } from "@/types/hotel";

interface HotelsResponse {
  status: string;
  results: number;
  data: { hotels: Hotel[] };
}

// از همون تابع امن (بدون تبدیل به UTC) که برای فلایت هم درست کردیم استفاده می‌کنیم.
function toLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface HotelSearchFormValues {
  destinationCity: string;
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  children: number;
  infants: number;
  roomNumber: number;
  roomType: RoomType;
}

export function buildHotelSearchParams(
  values: HotelSearchFormValues,
): Record<string, string> {
  return {
    // به‌جای location.city، یک کلید عمومی‌تر که هم اسم هتل هم شهر رو پوشش بده
    search: values.destinationCity.trim(),
    checkIn: toLocalDate(values.checkInDate),
    checkOut: toLocalDate(values.checkOutDate),
    adults: String(values.adults),
    children: String(values.children),
    infants: String(values.infants),
    rooms: String(values.roomNumber),
    roomType: values.roomType,
    capacity: String(values.adults + values.children),
  };
}

const BACKEND_QUERY_KEYS = [
  "search", // ← جایگزین location.city
  "minPrice",
  "maxPrice",
  "roomType",
  "capacity",
  "sort",
  "page",
  "limit",
  "fields",
] as const;

export function buildBackendHotelQuery(
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
