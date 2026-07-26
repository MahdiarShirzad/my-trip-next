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
  capacity?: number;
  price?: number;
  pricePerNight?: number;
  amenities?: string[];
  images?: string[];
  description?: string;
  isAvailable?: boolean;
  isBooked?: boolean;
}

export interface HotelLocation {
  city: string;
  address: string;
  zipCode?: string;
  country?: string;
}

export interface HotelDetail {
  _id: string;
  name: string;
  description?: string;
  location: HotelLocation;
  starRating: number;
  guestRating?: number;
  reviewCount?: number;
  propertyType?: PropertyType;
  rooms: Room[];
  amenities?: string[];
  images?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  totalRooms?: number;
  availableRooms: number;
  minPrice: number;
  maxPrice?: number;
}
