import api from "../lib/axios-interceptor";
import type { DashboardResponse } from "../types/dashboard.type";

export const getDashboardData = async () => {
  const res = await api.get<DashboardResponse>("/dashboard");

  if (!res.data.success) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.data.data;
};
