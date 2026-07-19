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

// TODO: wire this up to your real booking logic — e.g. verify the seat is
// still free, write the booking to the DB, mark the seat as isBooked, etc.
export async function confirmFlightBooking(
  input: ConfirmFlightBookingInput,
): Promise<ConfirmFlightBookingResult> {
  console.log("confirmFlightBooking called with", input);

  return {
    success: true,
    message: "Flight booked successfully!",
  };
}
