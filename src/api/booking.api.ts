import api from "../lib/axios-interceptor";

export interface BookingData {
  booking_id: number;
  user_id: number;
  service_id: number | null;
  branch_id: number | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  status: string;
  source: string | null;
  carmodel: string | null;
  created_at: string | null; // ISO timestamp
  updated_at: string | null; // ISO timestamp
}

export interface Booking {
  success: boolean;
  message: string;
  data: BookingData[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export const getBookings = async (params: string) => {
  const response = await api.get<Booking>("/bookings", { params });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};
