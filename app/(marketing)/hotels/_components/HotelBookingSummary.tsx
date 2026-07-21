import { HotelDetail } from "../hotel-booking";
import { Room } from "@/types/hotel";
import HotelImageGallery from "./HotelImageGallery";

interface HotelBookingSummaryProps {
  hotel: HotelDetail;
  selectedRoom: Room | null;
  nights: number;
}

export default function HotelBookingSummary({
  hotel,
  selectedRoom,
  nights,
}: HotelBookingSummaryProps) {
  const roomPrice = selectedRoom?.price ?? 0;
  const subtotal = roomPrice * nights;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

  const images =
    hotel.images && hotel.images.length > 0
      ? hotel.images
      : ["/images/hotel-summary-placeholder.jpg"];

  return (
    <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
      <p className="text-xl font-extrabold text-slate-900 dark:text-white">
        Booking Summary
      </p>

      <HotelImageGallery images={images} alt={hotel.name} />

      <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
        {hotel.name}
      </h3>

      <div className="mt-4">
        <p className="border-b border-slate-100 pb-2 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
          Hotel Info
        </p>
        <SummaryRow label="Location" value={hotel.location.city} />
        <SummaryRow label="Property Type" value={hotel.propertyType} />
        <SummaryRow
          label="Rating"
          value={`${hotel.guestRating}/5 (${hotel.reviewCount} reviews)`}
        />
        <SummaryRow label="Stars" value={`${hotel.starRating} ⭐`} />
        <SummaryRow
          label="Room"
          value={selectedRoom ? selectedRoom.roomNumber : "Not selected"}
        />
        <SummaryRow
          label="Room Type"
          value={
            selectedRoom
              ? selectedRoom.roomType.charAt(0).toUpperCase() +
                selectedRoom.roomType.slice(1)
              : "—"
          }
        />
      </div>

      <div>
        <p className="mt-6 border-b border-slate-100 pb-2 text-sm font-bold text-slate-900 dark:border-slate-800 dark:text-white">
          Payment
        </p>
        <SummaryRow
          label="Room Price (per night)"
          value={selectedRoom ? `$${roomPrice.toLocaleString()}` : "—"}
        />
        <SummaryRow
          label="Number of Nights"
          value={selectedRoom ? `${nights}` : "—"}
        />
        <SummaryRow
          label="Subtotal"
          value={selectedRoom ? `$${subtotal.toLocaleString()}` : "—"}
        />
        <SummaryRow
          label="Taxes & Fees"
          value={selectedRoom ? `$${taxes.toLocaleString()}` : "—"}
        />
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-bold text-slate-900 dark:text-white">
            You Pay
          </span>
          <span className="text-lg font-extrabold text-[#7167FF]">
            {selectedRoom ? `$${total.toLocaleString()}` : "—"}
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
