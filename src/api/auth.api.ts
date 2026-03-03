import api from "../lib/axios-interceptor";
import { API_ROUTES } from "../routes/api.routes";

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
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

export interface MeResponse {
  success: boolean;
  isLoggedIn: boolean;
  message: string;
  data: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    API_ROUTES.AUTH.REGISTER,
    payload,
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const getMe = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>(API_ROUTES.AUTH.ME);
  console.log("get me", response);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const signin = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, payload);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await api.post<LogoutResponse>(API_ROUTES.AUTH.LOGOUT);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data;
};
