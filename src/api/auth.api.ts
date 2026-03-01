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
  const response = await api.post<AuthResponse>("/auth/register", payload);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};
