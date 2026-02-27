import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import UsersTable from "../components/users/UsersTable";
import type { UserBooking } from "../types/user.types";

export default function UsersPage() {
  const [users, setUsers] = useState<UserBooking[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, pt: 2 }}>
      <Stack mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Users
        </Typography>
      </Stack>

      <UsersTable data={users} loading={loading} />
    </Box>
  );
}
