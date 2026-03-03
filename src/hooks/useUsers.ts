import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getUsers,
  type GetUsersParams,
  type UsersResponse,
} from "../api/users.api";

export const useUsers = (params: GetUsersParams) => {
  return useQuery<UsersResponse>({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
};
