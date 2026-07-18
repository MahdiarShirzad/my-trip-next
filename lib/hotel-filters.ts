import { Hotel, PropertyType, RoomType } from "@/types/hotel";

// ---------------------------------------------------------------------------
// URL search params shape — mirrors flight-filters.ts FlightSearchParams.
// Every filter is string | string[] because Next.js searchParams are always
// strings coming off the URL.
// ---------------------------------------------------------------------------
export interface HotelSearchParams {
  minPrice?: string;
  maxPrice?: string;
  star?: string | string[]; // e.g. ?star=4&star=5
  propertyType?: string | string[];
  roomType?: string | string[];
  amenity?: string | string[];
  minGuestRating?: string;
  sort?: string;
}

export type SortOption =
  | "default"
  | "price_asc"
  | "price_desc"
  | "guest_rating"
  | "star_rating";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "guest_rating", label: "Rating" },
  { value: "star_rating", label: "Stars" },
];

export const AMENITIES_OPTIONS = [
  "Free WiFi",
  "Breakfast included",
  "Parking",
  "Pool",
  "Spa",
  "Gym",
  "Air Conditioning",
  "Pet-friendly",
] as const;

export const PROPERTY_TYPE_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "hotel", label: "Hotel" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "hostel", label: "Hostel" },
  { value: "resort", label: "Resort" },
];

export const ROOM_TYPE_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "suite", label: "Suite" },
  { value: "deluxe", label: "Deluxe" },
];

export const GUEST_RATING_THRESHOLDS = [4.5, 4, 3.5, 3] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toArray(value?: string | string[]): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/** Derive the min/max price bounds from the dataset (mirrors getPriceBounds). */
export function getPriceBounds(hotels: Hotel[]): { min: number; max: number } {
  if (hotels.length === 0) return { min: 0, max: 0 };
  let min = Infinity;
  let max = -Infinity;
  for (const hotel of hotels) {
    if (hotel.minPrice < min) min = hotel.minPrice;
    if (hotel.maxPrice > max) max = hotel.maxPrice;
  }
  return { min, max };
}

/** Distinct property types present in the dataset (mirrors getAirlineOptions). */
export function getPropertyTypeOptions(hotels: Hotel[]): PropertyType[] {
  return Array.from(new Set(hotels.map((h) => h.propertyType)));
}

function departureBucket(hour: number): "morning" | "afternoon" | "evening" | "night" {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 24) return "evening";
  return "night";
}
void departureBucket; // not used for hotels, kept out of the public API on purpose

/** Filters the hotel list against every param present in the URL. */
export function filterHotels(hotels: Hotel[], params: HotelSearchParams): Hotel[] {
  const stars = toArray(params.star).map(Number);
  const propertyTypes = toArray(params.propertyType) as PropertyType[];
  const roomTypes = toArray(params.roomType) as RoomType[];
  const amenities = toArray(params.amenity);
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const minGuestRating = params.minGuestRating
    ? Number(params.minGuestRating)
    : undefined;

  return hotels.filter((hotel) => {
    if (minPrice !== undefined && hotel.maxPrice < minPrice) return false;
    if (maxPrice !== undefined && hotel.minPrice > maxPrice) return false;

    if (stars.length > 0 && !stars.includes(hotel.starRating)) return false;

    if (
      minGuestRating !== undefined &&
      hotel.guestRating < minGuestRating
    )
      return false;

    if (
      propertyTypes.length > 0 &&
      !propertyTypes.includes(hotel.propertyType)
    )
      return false;

    if (
      amenities.length > 0 &&
      !amenities.every((a) => hotel.amenities.includes(a))
    )
      return false;

    if (
      roomTypes.length > 0 &&
      !hotel.rooms.some((room) => roomTypes.includes(room.roomType))
    )
      return false;

    return true;
  });
}

/** Sorts the (already filtered) hotel list according to ?sort= */
export function sortHotels(hotels: Hotel[], sort?: string): Hotel[] {
  const list = [...hotels];
  switch (sort as SortOption) {
    case "price_asc":
      return list.sort((a, b) => a.minPrice - b.minPrice);
    case "price_desc":
      return list.sort((a, b) => b.minPrice - a.minPrice);
    case "guest_rating":
      return list.sort((a, b) => b.guestRating - a.guestRating);
    case "star_rating":
      return list.sort((a, b) => b.starRating - a.starRating);
    default:
      return list;
  }
}
