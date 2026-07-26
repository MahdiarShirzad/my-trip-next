import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildQuery } from "../api";
import { Booking, BookingStatus } from "../types";

interface BookingsFilters {
  page: number;
  limit: number;
  bookingType?: string;
  status?: string;
  from?: string;
  to?: string;
}

interface BookingsListResponse {
  status: string;
  results: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: Booking[];
}

export function useBookings(filters: BookingsFilters) {
  return useQuery({
    queryKey: ["admin", "bookings", filters],
    queryFn: async () => {
      const formattedTo = filters.to
        ? `${filters.to}T23:59:59.999Z`
        : undefined;

      const query = buildQuery({
        page: filters.page,
        limit: filters.limit,
        sort: "-createdAt",
        bookingType: filters.bookingType || undefined,
        status: filters.status || undefined,
        "createdAt[gte]": filters.from || undefined,
        "createdAt[lte]": formattedTo,
      });

      const res = await api.get<BookingsListResponse>(`/bookings${query}`);
      return {
        bookings: res.data,
        total: res.total,
        totalPages: res.totalPages,
      };
    },
    placeholderData: (prev) => prev,
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: BookingStatus }) =>
      api.patch(`/bookings/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "flights"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "hotels"] });
    },
  });
}

interface UserBookingsResponse {
  status: string;
  data: Booking[];
}

export function useUserBookings(userId: string | undefined) {
  return useQuery({
    queryKey: ["admin", "bookings", "by-user", userId],
    queryFn: async () => {
      const query = buildQuery({ user: userId, limit: 20, sort: "-createdAt" });
      const res = await api.get<UserBookingsResponse>(`/bookings${query}`);
      return res.data;
    },
    enabled: Boolean(userId),
  });
}
