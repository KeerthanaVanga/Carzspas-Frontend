import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { UserBooking } from "../../types/user.types";
import UsersTableSkeleton from "./UsersTableSkeleton";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Typography } from "@mui/material";

interface Props {
  data: UserBooking[];
  loading: boolean;
}

export default function UsersTable({ data, loading }: Props) {
  const columns = ["Name", "Phone", "Email", "Bookings Count", "Created At"];

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
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box
                  sx={{
                    py: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  {/* Icon */}
                  <InboxIcon
                    sx={{
                      fontSize: 48,
                      color: "primary.main",
                      opacity: 0.7,
                    }}
                  />

                  {/* Title */}
                  <Typography variant="h6" fontWeight={600}>
                    No Users Found
                  </Typography>

                  {/* Subtitle */}
                  <Typography variant="body2" color="text.disabled">
                    There are no users to display right now.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
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
                <TableCell>{user.booking_count}</TableCell>
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
