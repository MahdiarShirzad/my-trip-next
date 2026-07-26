import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildQuery } from "../api";
import { Flight } from "../types";

interface FlightsFilters {
  page: number;
  limit: number;
  search?: string;
}

interface FlightsListResponse {
  status: string;
  results: number;
  totalPages: number;
  currentPage: number;
  data: { flights: Flight[] };
}

export function useFlights(filters: FlightsFilters) {
  return useQuery({
    queryKey: ["admin", "flights", filters],
    queryFn: async () => {
      const query = buildQuery({
        page: filters.page,
        limit: filters.limit,
        sort: "-departureTime",
        search: filters.search || undefined,
      });
      const res = await api.get<FlightsListResponse>(`/flights${query}`);
      return {
        flights: res.data.flights,
        total: res.results,
        totalPages: res.totalPages,
      };
    },
    placeholderData: (prev) => prev,
  });
}

export function useDeleteFlight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/flights/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "flights"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
    },
  });
}

export function useSaveFlight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id?: string; payload: unknown }) =>
      id ? api.patch(`/flights/${id}`, payload) : api.post("/flights", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "flights"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
    },
  });
}
