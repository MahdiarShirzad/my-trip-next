import Link from "next/link";
// import Title from "@/components/common/title";
// import FlightCard from "./flight-card";
// import FlightCardSkeleton from "./flight-card-skeleton";
import type { Flight } from "@/types/flight";
import FlightCard from "./FlightCard";
import FlightCardSkeleton from "./FlightCardSkeleton";
import Title from "./Title";

// TEMP: hardcoded sample data shaped exactly like the real flight documents.
// Swap this out for a server-side fetch (or pass real `data`/`isLoading` props
// in from a parent) once the API route is wired up — the props below already
// support that, this is just the default while there's no fetching yet.
const sampleFlights: Flight[] = [
  {
    _id: "64f1a2b3c4d5e6f7a8b90001",
    airline: "Iran Air",
    flightNumber: "IR123",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "IST", city: "Istanbul" },
    departureTime: "2026-07-20T08:00:00.000Z",
    arrivalTime: "2026-07-20T11:30:00.000Z",
    status: "scheduled",
    totalSeats: 8,
    availableSeats: 8,
    seats: [
      { seatNumber: "1A", class: "first", price: 500, isBooked: false },
      { seatNumber: "1B", class: "first", price: 500, isBooked: false },
      { seatNumber: "2A", class: "business", price: 300, isBooked: false },
      { seatNumber: "2B", class: "business", price: 300, isBooked: false },
      { seatNumber: "10A", class: "economy", price: 150, isBooked: false },
      { seatNumber: "10B", class: "economy", price: 150, isBooked: false },
      { seatNumber: "10C", class: "economy", price: 150, isBooked: false },
      { seatNumber: "10D", class: "economy", price: 150, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90002",
    airline: "Turkish Airlines",
    flightNumber: "TK876",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "IST", city: "Istanbul" },
    departureTime: "2026-07-22T13:45:00.000Z",
    arrivalTime: "2026-07-22T17:10:00.000Z",
    status: "delayed",
    totalSeats: 12,
    availableSeats: 9,
    seats: [
      { seatNumber: "1A", class: "first", price: 620, isBooked: false },
      { seatNumber: "1B", class: "first", price: 620, isBooked: false },
      { seatNumber: "2A", class: "business", price: 380, isBooked: true },
      { seatNumber: "2B", class: "business", price: 380, isBooked: false },
      { seatNumber: "2C", class: "business", price: 380, isBooked: false },
      { seatNumber: "11A", class: "economy", price: 175, isBooked: true },
      { seatNumber: "11B", class: "economy", price: 175, isBooked: true },
      { seatNumber: "11C", class: "economy", price: 175, isBooked: false },
      { seatNumber: "11D", class: "economy", price: 175, isBooked: false },
      { seatNumber: "11E", class: "economy", price: 175, isBooked: false },
      { seatNumber: "11F", class: "economy", price: 175, isBooked: false },
      { seatNumber: "12A", class: "economy", price: 175, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90003",
    airline: "Mahan Air",
    flightNumber: "W5061",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "DXB", city: "Dubai" },
    departureTime: "2026-07-21T10:15:00.000Z",
    arrivalTime: "2026-07-21T12:00:00.000Z",
    status: "scheduled",
    totalSeats: 10,
    availableSeats: 8,
    seats: [
      { seatNumber: "1A", class: "first", price: 540, isBooked: false },
      { seatNumber: "1B", class: "first", price: 540, isBooked: false },
      { seatNumber: "2A", class: "business", price: 320, isBooked: false },
      { seatNumber: "2B", class: "business", price: 320, isBooked: false },
      { seatNumber: "9A", class: "economy", price: 210, isBooked: true },
      { seatNumber: "9B", class: "economy", price: 210, isBooked: true },
      { seatNumber: "9C", class: "economy", price: 210, isBooked: false },
      { seatNumber: "9D", class: "economy", price: 210, isBooked: false },
      { seatNumber: "9E", class: "economy", price: 210, isBooked: false },
      { seatNumber: "9F", class: "economy", price: 210, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90004",
    airline: "Qatar Airways",
    flightNumber: "QR498",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "DOH", city: "Doha" },
    departureTime: "2026-07-23T06:30:00.000Z",
    arrivalTime: "2026-07-23T08:20:00.000Z",
    status: "scheduled",
    totalSeats: 8,
    availableSeats: 3,
    seats: [
      { seatNumber: "1A", class: "first", price: 610, isBooked: false },
      { seatNumber: "2A", class: "business", price: 360, isBooked: true },
      { seatNumber: "2B", class: "business", price: 360, isBooked: false },
      { seatNumber: "8A", class: "economy", price: 195, isBooked: true },
      { seatNumber: "8B", class: "economy", price: 195, isBooked: true },
      { seatNumber: "8C", class: "economy", price: 195, isBooked: true },
      { seatNumber: "8D", class: "economy", price: 195, isBooked: true },
      { seatNumber: "8E", class: "economy", price: 195, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90005",
    airline: "Lufthansa",
    flightNumber: "LH601",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "FRA", city: "Frankfurt" },
    departureTime: "2026-07-24T23:50:00.000Z",
    arrivalTime: "2026-07-25T05:35:00.000Z",
    status: "scheduled",
    totalSeats: 13,
    availableSeats: 9,
    seats: [
      { seatNumber: "1A", class: "first", price: 980, isBooked: false },
      { seatNumber: "1B", class: "first", price: 980, isBooked: false },
      { seatNumber: "3A", class: "business", price: 540, isBooked: true },
      { seatNumber: "3B", class: "business", price: 540, isBooked: false },
      { seatNumber: "3C", class: "business", price: 540, isBooked: false },
      { seatNumber: "20A", class: "economy", price: 310, isBooked: true },
      { seatNumber: "20B", class: "economy", price: 310, isBooked: true },
      { seatNumber: "20C", class: "economy", price: 310, isBooked: true },
      { seatNumber: "20D", class: "economy", price: 310, isBooked: false },
      { seatNumber: "20E", class: "economy", price: 310, isBooked: false },
      { seatNumber: "20F", class: "economy", price: 310, isBooked: false },
      { seatNumber: "21A", class: "economy", price: 310, isBooked: false },
      { seatNumber: "21B", class: "economy", price: 310, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90006",
    airline: "Qeshm Air",
    flightNumber: "QB1202",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "MHD", city: "Mashhad" },
    departureTime: "2026-07-20T09:00:00.000Z",
    arrivalTime: "2026-07-20T10:15:00.000Z",
    status: "scheduled",
    totalSeats: 8,
    availableSeats: 8,
    seats: [
      { seatNumber: "1A", class: "business", price: 95, isBooked: false },
      { seatNumber: "6A", class: "economy", price: 55, isBooked: false },
      { seatNumber: "6B", class: "economy", price: 55, isBooked: false },
      { seatNumber: "6C", class: "economy", price: 55, isBooked: false },
      { seatNumber: "6D", class: "economy", price: 55, isBooked: false },
      { seatNumber: "7A", class: "economy", price: 55, isBooked: false },
      { seatNumber: "7B", class: "economy", price: 55, isBooked: false },
      { seatNumber: "7C", class: "economy", price: 55, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90007",
    airline: "Pegasus Airlines",
    flightNumber: "PC732",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "SAW", city: "Istanbul" },
    departureTime: "2026-07-25T02:20:00.000Z",
    arrivalTime: "2026-07-25T05:40:00.000Z",
    status: "boarding",
    totalSeats: 9,
    availableSeats: 7,
    seats: [
      { seatNumber: "1A", class: "business", price: 260, isBooked: false },
      { seatNumber: "9A", class: "economy", price: 130, isBooked: true },
      { seatNumber: "9B", class: "economy", price: 130, isBooked: true },
      { seatNumber: "9C", class: "economy", price: 130, isBooked: false },
      { seatNumber: "9D", class: "economy", price: 130, isBooked: false },
      { seatNumber: "9E", class: "economy", price: 130, isBooked: false },
      { seatNumber: "9F", class: "economy", price: 130, isBooked: false },
      { seatNumber: "10A", class: "economy", price: 130, isBooked: false },
      { seatNumber: "10B", class: "economy", price: 130, isBooked: false },
    ],
  },
  {
    _id: "64f1a2b3c4d5e6f7a8b90008",
    airline: "Mahan Air",
    flightNumber: "W5045",
    origin: { code: "THR", city: "Tehran" },
    destination: { code: "JED", city: "Jeddah" },
    departureTime: "2026-07-26T12:00:00.000Z",
    arrivalTime: "2026-07-26T15:15:00.000Z",
    status: "cancelled",
    totalSeats: 8,
    availableSeats: 5,
    seats: [
      { seatNumber: "1A", class: "first", price: 560, isBooked: false },
      { seatNumber: "2A", class: "business", price: 340, isBooked: true },
      { seatNumber: "2B", class: "business", price: 340, isBooked: false },
      { seatNumber: "8A", class: "economy", price: 200, isBooked: true },
      { seatNumber: "8B", class: "economy", price: 200, isBooked: true },
      { seatNumber: "8C", class: "economy", price: 200, isBooked: false },
      { seatNumber: "8D", class: "economy", price: 200, isBooked: false },
      { seatNumber: "8E", class: "economy", price: 200, isBooked: false },
    ],
  },
];

const SKELETON_COUNT = 8;

export default function FlightSection({
  data = sampleFlights,
  isLoading = false,
}: {
  data?: Flight[];
  isLoading?: boolean;
}) {
  return (
    <section className="container mx-auto mt-20 max-w-[1320px] px-4">
      <Title
        title="FLIGHTS"
        desc="Our Most Popular Flights"
        isCommentTitle={false}
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <FlightCardSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          data.map((flight) => <FlightCard flight={flight} key={flight._id} />)
        ) : (
          <p className="col-span-full my-20 text-center font-interBlack text-4xl text-slate-800 dark:text-slate-300">
            No flights found...
          </p>
        )}
      </div>

      {!isLoading && data && data.length > 0 && (
        <Link
          href="/flights"
          className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-xl bg-[#7167FF] px-6 py-3 font-interSemiBold text-white transition-colors hover:bg-[#5b52e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7167FF] focus-visible:ring-offset-2"
        >
          Discover more
          <svg
            aria-hidden="true"
            className="w-3.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </section>
  );
}
