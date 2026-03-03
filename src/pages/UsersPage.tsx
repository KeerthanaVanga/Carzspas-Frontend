import { Box, Typography, TablePagination } from "@mui/material";
import { useState, useMemo } from "react";
import { Dayjs } from "dayjs";
import UsersTable from "../components/users/UsersTable";
import UsersFilters from "../components/users/Usersfilters";
import { useUsers } from "../hooks/useUsers";
import type { UserBooking } from "../types/user.types";
import type { BackendUser } from "../api/users.api";

export default function UsersPage() {
  // MUI TablePagination is 0-based
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const fromDate = dateRange[0]?.startOf("day").toISOString();

  const toDate = dateRange[1]?.endOf("day").toISOString();

  // 👇 Convert to backend format
  const { data, isLoading } = useUsers({
    page: page + 1, // convert to 1-based
    limit: rowsPerPage,
    fromDate,
    toDate,
  });

  const users: UserBooking[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map(
      (user: BackendUser): UserBooking => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        booking_count: user._count.bookings,
        created_at: user.created_at,
      }),
    );
  }, [data]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Users
      </Typography>

      <UsersFilters
        dateRange={dateRange}
        onDateChange={(range) => {
          setPage(0); // reset page
          setDateRange(range);
        }}
      />

      <UsersTable data={users} loading={isLoading} />

      {/* ✅ Server-side TablePagination */}
      <TablePagination
        component="div"
        count={data?.meta.total ?? 0} // total records from backend
        page={page}
        onPageChange={(_, newPage: number) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // reset page when limit changes
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}
