export type RoomType = "single" | "double" | "suite" | "deluxe";

export type Room = {
  roomNumber: string;
  roomType: RoomType;
  capacity: number;
  price: number;
  amenities: string[];
  isAvailable: boolean;
};

export type Hotel = {
  _id: string;
  name: string;
  location: {
    city: string;
    address: string;
    zipCode: string;
  };
  starRating: number;
  rooms: Room[];
  amenities: string[];
  images: string[];
  checkInTime: string;
  checkOutTime: string;
  totalRooms: number;
  availableRooms: number;
  minPrice: number;
  maxPrice: number;
};

export type HotelSummary = Omit<Hotel, "rooms">;
