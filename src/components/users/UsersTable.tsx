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
import type { UserBooking } from "../../types/user.types";
import UsersTableSkeleton from "./UsersTableSkeleton";

interface Props {
  data: UserBooking[];
  loading: boolean;
}

const getStatusColor = (status: UserBooking["booking_status"]) => {
  switch (status) {
    case "Confirmed":
      return "#2e7d32";
    case "Pending":
      return "#ed6c02";
    case "Cancelled":
      return "#d32f2f";
    case "Completed":
      return "#0288d1";
    default:
      return "#D4AF37";
  }
};

export default function UsersTable({ data, loading }: Props) {
  const columns = [
    "Name",
    "Phone",
    "Email",
    "Service",
    "Booking Date",
    "Booking Time",
    "Status",
    "Created At",
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <UsersTableSkeleton columns={columns.length} />
          ) : (
            data.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.05)",
                  },
                }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.service}</TableCell>
                <TableCell>{user.booking_date}</TableCell>
                <TableCell>{user.booking_time}</TableCell>
                <TableCell>
                  <Chip
                    label={user.booking_status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(user.booking_status),
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
