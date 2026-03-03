import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getBookings,
  getBookingStatus,
  updateBookingStatus,
} from "../api/booking.api";
import type { GetBookingsParams } from "../api/booking.api";

export const useBookings = (params: GetBookingsParams) => {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => getBookings(params),
    placeholderData: keepPreviousData,
  });
};

export const useBookingStatus = () => {
  return useQuery<string[]>({
    queryKey: ["booking-statuses"],
    queryFn: getBookingStatus,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: {
      bookingId: number;
      status: string;
    }) => updateBookingStatus(bookingId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
