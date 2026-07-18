import { Flight as ApiFlight } from "@/types/flight";
import { Flight as UIFlight } from "@/app/_components/flight-filters";

export function adaptFlights(flights: ApiFlight[]): UIFlight[] {
  return flights.map((flight) => ({
    _id: flight._id,
    airline: flight.airline,
    flightNumber: flight.flightNumber,

    origin: flight.origin.city,
    destination: flight.destination.city,

    departureTime: flight.departureTime,
    arrivalTime: flight.arrivalTime,

    duration:
      (new Date(flight.arrivalTime).getTime() -
        new Date(flight.departureTime).getTime()) /
      60000,

    price:
      flight.seats.length > 0
        ? Math.min(...flight.seats.map((seat) => seat.price))
        : 0,

    class: flight.seats[0]?.class ?? "economy",

    seatsAvailable: flight.availableSeats,
  }));
}
