export type RoomType = "single" | "double" | "suite" | "deluxe";

export type PropertyType =
  | "hotel"
  | "apartment"
  | "villa"
  | "hostel"
  | "resort";

export interface Room {
  roomNumber: string;
  roomType: RoomType;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  description: string;
  isAvailable: boolean;
}

export interface HotelLocation {
  city: string;
  address: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  location: HotelLocation;

  starRating: number; // 1-5, official hotel star rating

  // UI-only until backend adds a reviews/ratings model:
  guestRating: number; // 0-5, aggregated user review score
  reviewCount: number;
  propertyType: PropertyType;

  rooms: Room[];
  amenities: string[];
  images: string[];

  checkInTime: string;
  checkOutTime: string;

  totalRooms: number;
  availableRooms: number;

  minPrice: number;
  maxPrice: number;
}

// ---- Filter option lists (single source of truth for the UI) ----

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

// NOTE: the spec image lists "Family Room" but the backend roomType enum
// is single | double | suite | deluxe (no "family room"). Using the real
// enum here so the filter actually matches backend data — swap this out
// if "family room" gets added to the schema.
export const ROOM_TYPE_OPTIONS: { value: RoomType; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "suite", label: "Suite" },
  { value: "deluxe", label: "Deluxe" },
];

export const GUEST_RATING_THRESHOLDS = [4.5, 4, 3.5, 3] as const;

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
  { value: "guest_rating", label: "Rating (امتیاز کاربران)" },
  { value: "star_rating", label: "Stars (ستاره هتل)" },
];

export interface HotelFiltersState {
  priceRange: [number, number];
  starRatings: number[]; // multi-select, e.g. [4, 5]
  minGuestRating: number | null; // single threshold, e.g. 4.5
  amenities: string[]; // must have ALL selected
  propertyTypes: PropertyType[];
  roomTypes: RoomType[]; // hotel must have at least one matching room
}

export const PRICE_BOUNDS: [number, number] = [500_000, 15_000_000];
export const DEFAULT_PRICE_RANGE: [number, number] = [1_000_000, 10_000_000];

export const DEFAULT_FILTERS: HotelFiltersState = {
  priceRange: DEFAULT_PRICE_RANGE,
  starRatings: [],
  minGuestRating: null,
  amenities: [],
  propertyTypes: [],
  roomTypes: [],
};
