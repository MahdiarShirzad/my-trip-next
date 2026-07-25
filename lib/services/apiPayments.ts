import { apiRequest } from "../utils/apiClient";

interface InitiatePaymentResponse {
  status: string;
  data: {
    payment: {
      _id: string;
      transactionId: string;
      amount: number;
      status: "pending" | "success" | "failed";
    };
  };
}

interface ConfirmPaymentResponse {
  status: string;
  data: {
    payment: unknown;
    booking: unknown;
  };
}

export async function initiatePayment(bookingId: string) {
  return apiRequest<InitiatePaymentResponse>("/payments", {
    method: "POST",
    body: { bookingId, method: "mock_card" },
  });
}

export async function confirmPayment(transactionId: string) {
  return apiRequest<ConfirmPaymentResponse>("/payments/confirm", {
    method: "POST",
    body: { transactionId, cardLast4: "4242" },
  });
}
