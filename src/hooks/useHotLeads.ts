import { useQuery } from "@tanstack/react-query";
import { getHotLeads } from "../api/leads.api";

export const useHotLeads = () => {
  return useQuery({
    queryKey: ["hot-leads"],
    queryFn: getHotLeads,
  });
};
