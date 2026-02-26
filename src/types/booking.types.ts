export interface Booking {
  booking_id: number;
  user_name: string;
  phone_number: string;
  service_name: string;
  branch_name: string;
  date: string;
  time: string;
  status: "Confirm" | "Reschedule" | "Cancel";
  source?: string;
  created_at: string;
}
