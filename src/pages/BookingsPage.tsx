import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import BookingsTable from "../components/bookings/BookingsTable";
import BookingsFilters from "../components/bookings/BookingFilters";
import type { Booking } from "../types/booking.types";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    status: string;
    search: string;
    dateRange: [Dayjs | null, Dayjs | null];
  }>({
    status: "",
    search: "",
    dateRange: [null, null],
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

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const created = dayjs(b.created_at);

      const matchesStatus =
        filters.status === "" || b.status === filters.status;

      const matchesSearch =
        filters.search === "" ||
        b.user_name.toLowerCase().includes(filters.search.toLowerCase()) ||
        b.phone_number.includes(filters.search);

      const matchesDate =
        !filters.dateRange[0] ||
        !filters.dateRange[1] ||
        (created.isAfter(filters.dateRange[0].startOf("day")) &&
          created.isBefore(filters.dateRange[1].endOf("day")));

      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [bookings, filters]);

  return (
    <Box>
      <Box
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Bookings
        </Typography>

        <BookingsFilters
          status={filters.status}
          search={filters.search}
          dateRange={filters.dateRange}
          onChange={(field, value) =>
            setFilters((prev) => ({ ...prev, [field]: value }))
          }
        />
      </Box>

      <BookingsTable data={filteredBookings} loading={loading} />
    </Box>
  );
}
