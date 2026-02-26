import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import type { Booking } from "./../../types/booking.types";
import BookingsTableSkeleton from "./BookingTableSkeleton";

interface Props {
  data: Booking[];
  loading: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirm":
      return { bg: "success.main", color: "#000" };
    case "Reschedule":
      return { bg: "warning.main", color: "#000" };
    case "Cancel":
      return { bg: "error.main", color: "#fff" };
    default:
      return { bg: "primary.main", color: "#000" };
  }
};

export default function BookingsTable({ data, loading }: Props) {
  const columns = [
    "User",
    "Phone",
    "Service",
    "Branch",
    "Date",
    "Time",
    "Status",
    "Created At",
  ];

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col}
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <BookingsTableSkeleton columns={columns.length} />
          ) : (
            data.map((booking) => (
              <TableRow
                key={booking.booking_id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.05)",
                  },
                }}
              >
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>{booking.phone_number}</TableCell>
                <TableCell>{booking.service_name}</TableCell>
                <TableCell>{booking.branch_name}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>

                <TableCell>
                  <Chip
                    label={booking.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(booking.status).bg,
                      color: getStatusColor(booking.status).color,
                      fontWeight: 600,
                    }}
                  />
                </TableCell>

                <TableCell>
                  {new Date(booking.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
