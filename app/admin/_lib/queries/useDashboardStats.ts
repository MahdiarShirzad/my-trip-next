import { getDashboardStats } from "@/lib/services/admin";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin", "dashboard-stats"],
    queryFn: getDashboardStats,
  });
}
