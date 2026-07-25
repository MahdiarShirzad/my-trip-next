import type { Flight, FlightStatus, SeatClass } from "@/types/flight";

export function formatFlightTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function isFlightExpired(flight: Flight) {
  return new Date(flight.departureTime).getTime() < Date.now();
}

export function formatFlightDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getFlightDuration(departureTime: string, arrivalTime: string) {
  const ms =
    new Date(arrivalTime).getTime() - new Date(departureTime).getTime();
  const totalMinutes = Math.max(0, Math.round(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export function getStartingPrice(
  flight: Flight,
  seatClass: SeatClass = "economy",
): number | null {
  if (!flight.seats || flight.seats.length === 0) return null;

  const inClass = flight.seats.filter((seat) => seat.class === seatClass);
  const pool = inClass.length > 0 ? inClass : flight.seats;
  return Math.min(...pool.map((seat) => seat.price));
}

export function getSeatsLeftLabel(flight: Flight) {
  if (flight.availableSeats === 0) return "Sold out";
  if (flight.availableSeats <= 3) return `Only ${flight.availableSeats} left`;
  return `${flight.availableSeats} seats left`;
}

const AVATAR_GRADIENTS = [
  "from-[#7167FF] to-[#5b52e0]",
  "from-[#f96768] to-[#e0484a]",
  "from-[#2dd4bf] to-[#0f9c8c]",
  "from-[#f5a623] to-[#e08600]",
  "from-[#4f9dde] to-[#2f6fb0]",
];

export function getAirlineAvatar(airline: string) {
  const initials = airline
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const hash = airline
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const gradient = AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];

  return { initials, gradient };
}

export const STATUS_STYLES: Record<
  FlightStatus,
  { label: string; className: string }
> = {
  scheduled: {
    label: "On time",
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  boarding: {
    label: "Boarding",
    className: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  },
  delayed: {
    label: "Delayed",
    className:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
  departed: {
    label: "Departed",
    className:
      "bg-slate-100 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  },
  completed: {
    label: "Completed",
    className:
      "bg-slate-100 text-slate-500 dark:bg-slate-500/10 dark:text-slate-400",
  },
};
