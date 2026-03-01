import { useMutation } from "@tanstack/react-query";
import { signup, type SignupPayload } from "../api/auth.api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/path.route";
export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),

    onSuccess: (data) => {
      console.log("Signup success", data);
      navigate(ROUTES.DASHBOARD, { replace: true });
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Signup error:", error.response?.data?.message);
    },
  });
};
