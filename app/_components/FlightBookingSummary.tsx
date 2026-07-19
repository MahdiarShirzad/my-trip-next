import Image from "next/image";
import { FlightDetail, Seat } from "@/types/flight-booking";

interface FlightBookingSummaryProps {
  flight: FlightDetail;
  selectedSeat: Seat | null;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FlightBookingSummary({
  flight,
  selectedSeat,
}: FlightBookingSummaryProps) {
  const basePrice = selectedSeat?.price ?? 0;
  const taxes = Math.round(basePrice * 0.08);
  const total = basePrice + taxes;

  return (
    <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-xl font-extrabold text-slate-900 dark:text-white">
        Booking Summary
      </p>

      <div className="relative mt-4 h-40 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        {/* TODO: replace with a real airline/aircraft image */}
        <Image
          src="/images/flight-summary-placeholder.jpg"
          alt={flight.airline}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
        {flight.origin.city} → {flight.destination.city}
      </h3>

      <div className="mt-4">
        <p className="border-b border-slate-100 pb-2 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
          Flight Info
        </p>
        <SummaryRow label="Airline" value={flight.airline} />
        <SummaryRow label="Flight No." value={flight.flightNumber} />
        <SummaryRow label="Departs" value={formatDateTime(flight.departureTime)} />
        <SummaryRow label="Arrives" value={formatDateTime(flight.arrivalTime)} />
        <SummaryRow
          label="Seat"
          value={selectedSeat ? selectedSeat.seatNumber : "Not selected yet"}
        />
        <SummaryRow
          label="Class"
          value={
            selectedSeat
              ? selectedSeat.class.charAt(0).toUpperCase() +
                selectedSeat.class.slice(1)
              : "—"
          }
        />
      </div>

      <div>
        <p className="mt-6 border-b border-slate-100 pb-2 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
          Payment
        </p>
        <SummaryRow
          label="Seat Price"
          value={selectedSeat ? `$${basePrice.toLocaleString()}` : "—"}
        />
        <SummaryRow
          label="Taxes & Fees"
          value={selectedSeat ? `$${taxes.toLocaleString()}` : "—"}
        />
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-900 dark:text-white">
            You Pay
          </span>
          <span className="text-lg font-extrabold text-[#7167FF]">
            {selectedSeat ? `$${total.toLocaleString()}` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="my-3 flex items-center justify-between text-sm">
      <span className="font-bold text-slate-700 dark:text-slate-300">
        {label}
      </span>
      <span className="text-slate-500 dark:text-slate-400">{value}</span>
    </div>
  );
}
