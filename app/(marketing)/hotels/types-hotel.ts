// types/hotel.ts
// Mirrors the backend Mongoose model (Hotel/Room) 1:1, plus a few
// UI-only fields that aren't in the backend schema yet:
//   - guestRating / reviewCount  -> aggregated user review score
//   - propertyType               -> Hotel / Apartment / Villa / Hostel / Resort
// Once the backend adds these, just drop the "UI-only" comment and keep the shape.
//
// NOTE: filter option lists (AMENITIES_OPTIONS, PROPERTY_TYPE_OPTIONS, etc.)
// and all filter/sort logic now live in @/lib/hotel-filters, mirroring how
// flight-filters.ts owns that responsibility for flights. This file only
// keeps the data shape.

export type RoomType = "single" | "double" | "suite" | "deluxe";

export type PropertyType = "hotel" | "apartment" | "villa" | "hostel" | "resort";

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

export const PRICE_BOUNDS: [number, number] = [500_000, 15_000_000];
