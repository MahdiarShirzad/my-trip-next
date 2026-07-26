import { apiRequest } from "@/lib/utils/apiClient";

export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  paidBookings: number;
  totalUsers: number;
  totalFlights: number;
  totalHotels: number;
}

interface DashboardStatsResponse {
  status: string;
  data: DashboardStats;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const res = await apiRequest<DashboardStatsResponse>("/admin/stats");
  return res?.data ?? null;
}
