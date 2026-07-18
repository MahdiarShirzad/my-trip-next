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
  checkInTime: string;
  checkOutTime: string;
  totalRooms: number;
  availableRooms: number;
  minPrice: number;
  maxPrice: number;
};

// Mock data mirroring the real Hotel/Room mongoose schema.
// Swap this out for a real fetch once the API layer is wired up.
export const sampleHotels: Hotel[] = [
  {
    _id: "6b7a2f14c9d8e001aa22b301",
    name: "Espinas Palace Hotel",
    location: {
      city: "Tehran",
      address: "Africa Blvd, Tehran",
      zipCode: "1967743511",
    },
    starRating: 5,
    rooms: [
      {
        roomNumber: "101",
        roomType: "single",
        capacity: 1,
        price: 90,
        amenities: ["Wi-Fi", "AC"],
        isAvailable: true,
      },
      {
        roomNumber: "204",
        roomType: "double",
        capacity: 2,
        price: 140,
        amenities: ["Wi-Fi", "AC", "Minibar"],
        isAvailable: true,
      },
      {
        roomNumber: "310",
        roomType: "suite",
        capacity: 4,
        price: 260,
        amenities: ["Wi-Fi", "AC", "Minibar", "Jacuzzi"],
        isAvailable: false,
      },
      {
        roomNumber: "401",
        roomType: "deluxe",
        capacity: 3,
        price: 320,
        amenities: ["Wi-Fi", "AC", "Minibar", "City view"],
        isAvailable: true,
      },
    ],
    amenities: ["Pool", "Spa", "Free parking", "Restaurant"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    totalRooms: 4,
    availableRooms: 3,
    minPrice: 90,
    maxPrice: 320,
  },
  {
    _id: "6b7a2f14c9d8e001aa22b302",
    name: "Parsian Azadi Hotel",
    location: {
      city: "Tehran",
      address: "Chamran Highway, Tehran",
      zipCode: "1481734611",
    },
    starRating: 4,
    rooms: [
      {
        roomNumber: "112",
        roomType: "single",
        capacity: 1,
        price: 70,
        amenities: ["Wi-Fi"],
        isAvailable: true,
      },
      {
        roomNumber: "220",
        roomType: "double",
        capacity: 2,
        price: 110,
        amenities: ["Wi-Fi", "AC"],
        isAvailable: true,
      },
      {
        roomNumber: "315",
        roomType: "suite",
        capacity: 4,
        price: 210,
        amenities: ["Wi-Fi", "AC", "Minibar"],
        isAvailable: true,
      },
    ],
    amenities: ["Gym", "Restaurant", "Free parking"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    totalRooms: 3,
    availableRooms: 3,
    minPrice: 70,
    maxPrice: 210,
  },
  {
    _id: "6b7a2f14c9d8e001aa22b303",
    name: "Grand Bazaar Suites",
    location: {
      city: "Isfahan",
      address: "Naqsh-e Jahan Square, Isfahan",
      zipCode: "8134783561",
    },
    starRating: 4,
    rooms: [
      {
        roomNumber: "101",
        roomType: "single",
        capacity: 1,
        price: 55,
        amenities: ["Wi-Fi"],
        isAvailable: false,
      },
      {
        roomNumber: "202",
        roomType: "double",
        capacity: 2,
        price: 95,
        amenities: ["Wi-Fi", "AC"],
        isAvailable: false,
      },
      {
        roomNumber: "303",
        roomType: "deluxe",
        capacity: 3,
        price: 180,
        amenities: ["Wi-Fi", "AC", "Square view"],
        isAvailable: false,
      },
    ],
    amenities: ["Rooftop terrace", "Restaurant"],
    checkInTime: "13:00",
    checkOutTime: "11:00",
    totalRooms: 3,
    availableRooms: 0,
    minPrice: 55,
    maxPrice: 180,
  },
  {
    _id: "6b7a2f14c9d8e001aa22b304",
    name: "Caspian Shore Resort",
    location: {
      city: "Rasht",
      address: "Coastal Road, Rasht",
      zipCode: "4147913411",
    },
    starRating: 5,
    rooms: [
      {
        roomNumber: "1A",
        roomType: "double",
        capacity: 2,
        price: 130,
        amenities: ["Wi-Fi", "Sea view"],
        isAvailable: true,
      },
      {
        roomNumber: "2A",
        roomType: "suite",
        capacity: 4,
        price: 240,
        amenities: ["Wi-Fi", "Sea view", "Balcony"],
        isAvailable: true,
      },
      {
        roomNumber: "3A",
        roomType: "deluxe",
        capacity: 4,
        price: 300,
        amenities: ["Wi-Fi", "Sea view", "Balcony", "Jacuzzi"],
        isAvailable: true,
      },
    ],
    amenities: ["Private beach", "Pool", "Spa", "Restaurant"],
    checkInTime: "15:00",
    checkOutTime: "12:00",
    totalRooms: 3,
    availableRooms: 3,
    minPrice: 130,
    maxPrice: 300,
  },
  {
    _id: "6b7a2f14c9d8e001aa22b305",
    name: "Shiraz Garden Hotel",
    location: {
      city: "Shiraz",
      address: "Eram St, Shiraz",
      zipCode: "7134744471",
    },
    starRating: 3,
    rooms: [
      {
        roomNumber: "10",
        roomType: "single",
        capacity: 1,
        price: 45,
        amenities: ["Wi-Fi"],
        isAvailable: true,
      },
      {
        roomNumber: "22",
        roomType: "double",
        capacity: 2,
        price: 75,
        amenities: ["Wi-Fi", "AC"],
        isAvailable: true,
      },
    ],
    amenities: ["Garden", "Free parking"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    totalRooms: 2,
    availableRooms: 2,
    minPrice: 45,
    maxPrice: 75,
  },
  {
    _id: "6b7a2f14c9d8e001aa22b306",
    name: "Mashhad Royal Inn",
    location: {
      city: "Mashhad",
      address: "Imam Reza Shrine Ave, Mashhad",
      zipCode: "9137913711",
    },
    starRating: 4,
    rooms: [
      {
        roomNumber: "5A",
        roomType: "single",
        capacity: 1,
        price: 60,
        amenities: ["Wi-Fi"],
        isAvailable: true,
      },
      {
        roomNumber: "6B",
        roomType: "double",
        capacity: 2,
        price: 100,
        amenities: ["Wi-Fi", "AC"],
        isAvailable: false,
      },
      {
        roomNumber: "7C",
        roomType: "suite",
        capacity: 4,
        price: 190,
        amenities: ["Wi-Fi", "AC", "Minibar"],
        isAvailable: true,
      },
    ],
    amenities: ["Restaurant", "Free parking", "Shuttle service"],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    totalRooms: 3,
    availableRooms: 2,
    minPrice: 60,
    maxPrice: 190,
  },
];
