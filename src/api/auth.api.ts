import api from "../lib/axios-interceptor";

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
  };
}

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/register", payload);

  return data;
};
