import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UsersTable from "../components/users/UsersTable";
import type { UserBooking } from "../types/user.types";
import UsersFilters from "../components/users/Usersfilters";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "Ravi Kumar",
          phone: "9876543210",
          email: "ravi@gmail.com",
          service: "Exterior Detailing",
          booking_date: "2026-03-01",
          booking_time: "10:30 AM",
          booking_status: "Confirmed",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Priya Sharma",
          phone: "9123456780",
          email: "priya@gmail.com",
          service: "Interior Detailing",
          booking_date: "2026-03-02",
          booking_time: "12:00 PM",
          booking_status: "Pending",
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const created = dayjs(user.created_at);

      const matchesStatus =
        statusFilter === "" || user.booking_status === statusFilter;

      const matchesDate =
        !dateRange[0] ||
        !dateRange[1] ||
        (created.isAfter(dateRange[0].startOf("day")) &&
          created.isBefore(dateRange[1].endOf("day")));

      return matchesStatus && matchesDate;
    });
  }, [users, statusFilter, dateRange]);

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, pt: 2 }}>
      <Box
        mb={4}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Heading */}
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Users
        </Typography>

        {/* Filters */}
        <Box sx={{ width: { xs: "100%", md: "auto" } }}>
          <UsersFilters
            status={statusFilter}
            dateRange={dateRange}
            onStatusChange={setStatusFilter}
            onDateChange={setDateRange}
          />
        </Box>
      </Box>

      <UsersTable data={filteredUsers} loading={loading} />
    </Box>
  );
}
