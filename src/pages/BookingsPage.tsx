import { Box, Typography, TablePagination } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import BookingsTable from "../components/bookings/BookingsTable";
import BookingsFilters from "../components/bookings/BookingFilters";
import { useBookings, useBookingStatus } from "../hooks/useBookings";

export default function BookingsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<{
    status: string;
    search: string;
    dateRange: [Dayjs | null, Dayjs | null];
  }>({
    status: "",
    search: "",
    dateRange: [null, null],
  });

  const { data: bookingStatuses = [] } = useBookingStatus();

  const { data, isLoading } = useBookings({
    page,
    limit,
    status: filters.status || undefined,
    search: filters.search || undefined,
    startDate: filters.dateRange[0]?.toISOString(),
    endDate: filters.dateRange[1]?.toISOString(),
  });

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Bookings
      </Typography>

      <BookingsFilters
        bookingStatuses={bookingStatuses}
        status={filters.status}
        search={filters.search}
        dateRange={filters.dateRange}
        onChange={(field, value) =>
          setFilters((prev) => ({ ...prev, [field]: value }))
        }
      />

      <BookingsTable data={data?.data ?? []} loading={isLoading} />

      {data && (
        <TablePagination
          component="div"
          count={data.meta.total}
          page={page - 1}
          rowsPerPage={limit}
          onPageChange={(_, newPage) => {
            setPage(newPage + 1);
          }}
          onRowsPerPageChange={(event) => {
            const newLimit = parseInt(event.target.value, 10);
            setLimit(newLimit);
            setPage(1); // reset to first page
          }}
          rowsPerPageOptions={[10, 20, 50]}
        />
      )}
    </Box>
  );
}
