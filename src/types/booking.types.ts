export interface BookingItem {
  booking_id: number;
  date: string;
  time: string;
  status: string;
  created_at: string;

  users: {
    name: string;
    phone: string; // ✅ correct
  };

  services: {
    id: number;
    name: string; // ✅ correct
  } | null;

  branches: {
    id: number;
    name: string; // ✅ correct
  } | null;
}

export interface BookingsResponse {
  success: boolean;
  message: string;
  data: BookingItem[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}
