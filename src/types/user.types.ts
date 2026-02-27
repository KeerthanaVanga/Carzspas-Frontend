export interface UserBooking {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  booking_date: string;
  booking_time: string;
  booking_status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  created_at: string;
}
