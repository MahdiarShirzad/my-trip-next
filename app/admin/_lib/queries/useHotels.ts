import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildQuery, uploadImage } from "../api";
import { Hotel } from "../types";

interface HotelsFilters {
  page: number;
  limit: number;
  search?: string;
}

interface HotelsListResponse {
  status: string;
  results: number;
  totalPages: number;
  currentPage: number;
  data: { hotels: Hotel[] };
}

export function useHotels(filters: HotelsFilters) {
  return useQuery({
    queryKey: ["admin", "hotels", filters],
    queryFn: async () => {
      const query = buildQuery({
        page: filters.page,
        limit: filters.limit,
        search: filters.search || undefined,
      });
      const res = await api.get<HotelsListResponse>(`/hotels${query}`);
      return {
        hotels: res.data.hotels,
        total: res.results,
        totalPages: res.totalPages,
      };
    },
    placeholderData: (prev) => prev,
  });
}

export function useDeleteHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/hotels/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "hotels"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
    },
  });
}

export function useSaveHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id?: string; payload: unknown }) =>
      id ? api.patch(`/hotels/${id}`, payload) : api.post("/hotels", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "hotels"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
    },
  });
}

export { uploadImage };
