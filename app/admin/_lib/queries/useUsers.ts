import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildQuery } from "../api";
import { AdminUser, Role } from "../types";

interface UsersFilters {
  page: number;
  limit: number;
  search?: string;
}

interface UsersListResponse {
  status: string;
  results: number;
  total: number;
  page: number;
  limit: number;
  data: AdminUser[];
}

export function useUsers(filters: UsersFilters) {
  return useQuery({
    queryKey: ["admin", "users", filters],
    queryFn: async () => {
      const query = buildQuery({
        page: filters.page,
        limit: filters.limit,
        keyword: filters.search || undefined,
      });
      const res = await api.get<UsersListResponse>(`/users${query}`);
      return {
        users: res.data,
        total: res.total,
      };
    },
    placeholderData: (prev) => prev,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: Role }) =>
      api.patch(`/users/${id}`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard-stats"] });
    },
  });
}
