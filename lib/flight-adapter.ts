import { Flight as ApiFlight } from "@/types/flight";
import { Flight as UIFlight } from "@/app/_components/flight-filters";

export function adaptFlights(flights: ApiFlight[]): UIFlight[] {
  return flights.map((flight) => {
    const cheapestSeat = flight.seats.reduce<
      (typeof flight.seats)[number] | null
    >((cheapest, seat) => {
      if (!cheapest || seat.price < cheapest.price) return seat;
      return cheapest;
    }, null);

    return {
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

      price: cheapestSeat?.price ?? 0,
      class: cheapestSeat?.class ?? "economy",

      seatsAvailable: flight.availableSeats,
    };
  });
}
