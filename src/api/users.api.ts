import api from "../lib/axios-interceptor";

/* -----------------------------
   Backend User Shape
------------------------------ */
export interface BackendUser {
  id: number;
  user_name: string;
  phone: string;
  email: string;
  created_at: string;
  _count: {
    bookings: number;
  };
}

/* -----------------------------
   API Params
------------------------------ */
export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
}

/* -----------------------------
   API Response
------------------------------ */
export interface UsersResponse {
  success: boolean;
  message: string;
  data: BackendUser[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

/* -----------------------------
   API Call
------------------------------ */
export const getUsers = async (
  params: GetUsersParams,
): Promise<UsersResponse> => {
  const response = await api.get<UsersResponse>("/users", {
    params,
  });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};
