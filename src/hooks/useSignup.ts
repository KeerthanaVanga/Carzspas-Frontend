import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { signup, type SignupPayload, type AuthResponse } from "../api/auth.api";

export const useSignup = (
  options?: UseMutationOptions<AuthResponse, Error, SignupPayload>,
) => {
  return useMutation({
    mutationFn: signup,
    ...options,
  });
};
