import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { signin, type LoginPayload, type LoginResponse } from "../api/auth.api";

export const useSignin = (
  options?: UseMutationOptions<LoginResponse, Error, LoginPayload>,
) => {
  return useMutation({
    mutationFn: signin,
    ...options,
  });
};
