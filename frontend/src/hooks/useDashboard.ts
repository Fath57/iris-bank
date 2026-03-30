import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type {
  GetDashboardStatsResponse,
  GetRecentTransactionsResponse,
} from "@/types/Dashboard";


export const useAccountStats = () => {
  return useQuery({
    queryKey: ["accountStats"],
    queryFn: async () => {
      const response = await api.get<GetDashboardStatsResponse>("/accounts/stats");
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
};


export const useRecentTransactions = (limit: number = 10) => {
  return useQuery({
    queryKey: ["recentTransactions", limit],
    queryFn: async () => {
      const response = await api.get<GetRecentTransactionsResponse>(
        "/transactions/recent",
        { params: { limit } }
      );
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });
};