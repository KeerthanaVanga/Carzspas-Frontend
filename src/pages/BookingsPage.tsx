import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import BookingsTable from "../components/bookings/BookingsTable";
import BookingsFilters from "../components/bookings/BookingFilters";
import type { Booking } from "../types/booking.types";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setBookings([
        {
          booking_id: 1,
          user_name: "Ravi Kumar",
          phone_number: "9876543210",
          service_name: "Ceramic Coating",
          branch_name: "Kukatpally",
          date: "2026-02-27",
          time: "10:30 AM",
          status: "Confirm",
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredBookings = bookings.filter((b) => {
    return (
      (filters.status ? b.status === filters.status : true) &&
      (filters.search
        ? b.user_name.toLowerCase().includes(filters.search.toLowerCase()) ||
          b.phone_number.includes(filters.search)
        : true)
    );
  });

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Bookings
      </Typography>

      <BookingsFilters
        status={filters.status}
        search={filters.search}
        onChange={(field, value) =>
          setFilters((prev) => ({ ...prev, [field]: value }))
        }
      />

      <BookingsTable data={filteredBookings} loading={loading} />
    </Box>
  );
}
