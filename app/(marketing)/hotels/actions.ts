"use server";

export interface ConfirmHotelBookingInput {
  hotelId: string;
  roomNumber: string;
  fullName: string;
  phone: string;
  address: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface ConfirmHotelBookingResult {
  success: boolean;
  message: string;
}

// TODO: wire this up to your real booking logic — verify room is still available,
// write booking to DB, mark room as booked for the given dates, etc.
export async function confirmHotelBooking(
  input: ConfirmHotelBookingInput,
): Promise<ConfirmHotelBookingResult> {
  console.log("confirmHotelBooking called with", input);

  return {
    success: true,
    message: "Hotel booked successfully!",
  };
}
