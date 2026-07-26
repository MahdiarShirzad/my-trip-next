export type Role = "user" | "admin";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  nationalId: string;
  role: Role;
  createdAt: string;
}

export interface Seat {
  seatNumber: string;
  class: "economy" | "business" | "first";
  price: number;
  isBooked: boolean;
}

export type FlightStatus = "scheduled" | "delayed" | "cancelled";

export interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  origin: { code: string; city: string };
  destination: { code: string; city: string };
  departureTime: string;
  arrivalTime: string;
  seats: Seat[];
  totalSeats: number;
  availableSeats: number;
  status: FlightStatus;
}

export interface Room {
  roomNumber: string;
  roomType: "single" | "double" | "suite" | "deluxe";
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
  description: string;
  isAvailable: boolean;
}

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  location: { city: string; address: string; zipCode: string };
  starRating: number;
  rooms: Room[];
  amenities: string[];
  images: string[];
  contactInfo: { phone: string; email: string };
  checkInTime: string;
  checkOutTime: string;
  totalRooms: number;
  availableRooms: number;
  minPrice: number;
  maxPrice: number;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "pending" | "paid" | "failed";
export type BookingType = "flight" | "hotel";

export interface Booking {
  _id: string;
  user: { _id: string; name: string; email: string; phone: string } | string;
  bookingType: BookingType;
  flightId?: Flight | string;
  hotelId?: Hotel | string;
  passengers?: {
    name: string;
    email: string;
    phone: string;
    seatNumber?: string;
  }[];
  guests?: { name: string; lastName: string; nationalId: string }[];
  checkInDate?: string;
  checkOutDate?: string;
  travelDate?: string;
  numberOfRooms?: number;
  roomType?: string;
  roomNumbers?: string[];
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  referenceNumber: string;
  createdAt: string;
}

export interface Paginated<T> {
  results: number;
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  paidBookings: number;
  totalUsers: number;
  totalFlights: number;
  totalHotels: number;
}
