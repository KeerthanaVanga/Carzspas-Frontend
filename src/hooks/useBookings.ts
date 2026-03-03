import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBookings } from "../api/booking.api";

export const useBookings = (params: string) => {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: () => getBookings(params),
    placeholderData: keepPreviousData,
  });
};
