import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { getMe, type LogoutResponse, logout } from "../api/auth.api";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false, // important (avoid infinite retry if 401)
    staleTime: 1000 * 60 * 5, // cache for 5 mins
  });
};

export const useLogout = (
  options?: UseMutationOptions<LogoutResponse, Error>,
) => {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
};
