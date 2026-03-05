import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
};
