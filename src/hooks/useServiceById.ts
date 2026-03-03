import { useQuery } from "@tanstack/react-query";
import { getServiceById } from "../api/service.api";

export const useServiceById = (id?: number) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id!),
    enabled: Boolean(id), // only run in edit mode
  });
};
