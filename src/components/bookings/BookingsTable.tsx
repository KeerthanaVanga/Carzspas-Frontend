import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";

import { useState } from "react";
import type { BookingItem } from "../../types/booking.types";
import BookingsTableSkeleton from "./BookingTableSkeleton";
import { useUpdateBookingStatus } from "../../hooks/useBookings";

interface Props {
  data: BookingItem[];
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
    case "Completed":
      return { bg: "#16A34A", color: "#fff" };
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
    "Action",
  ];

  const { mutateAsync } = useUpdateBookingStatus();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleToggleStatus = async (booking: BookingItem) => {
    try {
      setLoadingId(booking.booking_id);

      const newStatus =
        booking.status === "Completed" ? "Confirm" : "Completed";

      await mutateAsync({
        bookingId: booking.booking_id,
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

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
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box
                  sx={{
                    py: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  <InboxIcon
                    sx={{
                      fontSize: 48,
                      color: "primary.main",
                      opacity: 0.7,
                    }}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    No Bookings Found
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    There are no bookings to display right now.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            data.map((booking) => {
              const isRowLoading = loadingId === booking.booking_id;

              return (
                <TableRow
                  key={booking.booking_id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(212,175,55,0.05)",
                    },
                  }}
                >
                  <TableCell>{booking.users.name}</TableCell>

                  <TableCell>{booking.users.phone}</TableCell>

                  <TableCell>{booking.services?.name ?? "-"}</TableCell>

                  <TableCell>{booking.branches?.name ?? "-"}</TableCell>

                  <TableCell>
                    {new Date(booking.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {new Date(booking.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>

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

                  <TableCell>
                    <IconButton
                      onClick={() => handleToggleStatus(booking)}
                      disabled={isRowLoading}
                    >
                      {isRowLoading ? (
                        <CircularProgress size={20} />
                      ) : booking.status === "Completed" ? (
                        <ReplayIcon />
                      ) : (
                        <CheckCircleIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
