import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UsersTable from "../components/users/UsersTable";
import type { UserBooking } from "../types/user.types";
import UsersFilters from "../components/users/UsersFilters";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);
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
          booking_count: 3,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Priya Sharma",
          phone: "9123456780",
          email: "priya@gmail.com",
          booking_count: 1,
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const created = dayjs(user.created_at);

      const matchesDate =
        !dateRange[0] ||
        !dateRange[1] ||
        (created.isAfter(dateRange[0].startOf("day")) &&
          created.isBefore(dateRange[1].endOf("day")));

      return matchesDate;
    });
  }, [users, dateRange]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Users
      </Typography>

      <UsersFilters dateRange={dateRange} onDateChange={setDateRange} />

      <UsersTable data={filteredUsers} loading={loading} />
    </Box>
  );
}
