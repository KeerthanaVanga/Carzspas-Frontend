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
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

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

  // 🔥 Store per-row state
  const [statusState, setStatusState] = useState<
    Record<
      number,
      {
        loading: boolean;
        originalStatus: string;
        completed: boolean;
      }
    >
  >({});

  const handleToggleStatus = (booking: Booking) => {
    const current = statusState[booking.booking_id];

    // Start loading
    setStatusState((prev) => ({
      ...prev,
      [booking.booking_id]: {
        loading: true,
        originalStatus: current?.originalStatus ?? booking.status,
        completed: current?.completed ?? false,
      },
    }));

    // Simulate API call
    setTimeout(() => {
      setStatusState((prev) => ({
        ...prev,
        [booking.booking_id]: {
          loading: false,
          originalStatus: current?.originalStatus ?? booking.status,
          completed: !current?.completed,
        },
      }));
    }, 800);
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
              const state = statusState[booking.booking_id];
              const isLoading = state?.loading;
              const isCompleted = state?.completed;

              const displayStatus = isCompleted ? "Completed" : booking.status;

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
                  <TableCell>{booking.user_name}</TableCell>
                  <TableCell>{booking.phone_number}</TableCell>
                  <TableCell>{booking.service_name}</TableCell>
                  <TableCell>{booking.branch_name}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={displayStatus}
                      size="small"
                      sx={{
                        backgroundColor: getStatusColor(displayStatus).bg,
                        color: getStatusColor(displayStatus).color,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(booking.created_at).toLocaleDateString()}
                  </TableCell>

                  {/* 🔥 Action Column */}
                  <TableCell>
                    <IconButton
                      onClick={() => handleToggleStatus(booking)}
                      disabled={isLoading}
                      sx={{
                        color: isCompleted ? "#F59E0B" : "primary.main",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} />
                      ) : isCompleted ? (
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
