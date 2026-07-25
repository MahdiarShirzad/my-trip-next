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

export async function confirmHotelBooking(
  input: ConfirmHotelBookingInput,
): Promise<ConfirmHotelBookingResult> {
  console.log("confirmHotelBooking called with", input);

  return {
    success: true,
    message: "Hotel booked successfully!",
  };
}
