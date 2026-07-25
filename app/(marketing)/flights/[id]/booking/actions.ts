"use server";

export interface ConfirmFlightBookingInput {
  flightId: string;
  seatNumber: string;
  fullName: string;
  phone: string;
  address: string;
}

export interface ConfirmFlightBookingResult {
  success: boolean;
  message: string;
}

export async function confirmFlightBooking(
  input: ConfirmFlightBookingInput,
): Promise<ConfirmFlightBookingResult> {
  console.log("confirmFlightBooking called with", input);

  return {
    success: true,
    message: "Flight booked successfully!",
  };
}
