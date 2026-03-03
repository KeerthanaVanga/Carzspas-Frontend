import api from "../lib/axios-interceptor";
import type { BookingsResponse } from "../types/booking.types";

export interface GetBookingsParams {
  page: number;
  limit: number;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetBookingStatusParams {
  success: boolean;
  data: string[];
}

export const getBookings = async (
  params: GetBookingsParams,
): Promise<BookingsResponse> => {
  const response = await api.get<BookingsResponse>("/bookings", { params });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const getBookingStatus = async (): Promise<string[]> => {
  const response = await api.get("/bookings/booking-statuses");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const updateBookingStatus = async (
  bookingId: number,
  status: string,
) => {
  const response = await api.patch(`/bookings/${bookingId}/status`, { status });

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};
