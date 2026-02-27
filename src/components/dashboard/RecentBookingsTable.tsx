import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Skeleton,
} from "@mui/material";

interface Booking {
  id: number;
  user: string;
  service: string;
  branch: string;
  date: string;
  status: string;
}

interface Props {
  loading?: boolean;
}

export default function RecentBookingsTable({ loading = false }: Props) {
  // 🔥 Dummy Data (Replace with API later)
  const bookings: Booking[] = [
    {
      id: 1,
      user: "Ravi Kumar",
      service: "Ceramic Coating",
      branch: "Kukatpally",
      date: "2026-02-27",
      status: "Confirm",
    },
    {
      id: 2,
      user: "Priya Sharma",
      service: "Interior Detailing",
      branch: "Madhapur",
      date: "2026-02-28",
      status: "Pending",
    },
    {
      id: 3,
      user: "Ahmed",
      service: "PPF",
      branch: "Kondapur",
      date: "2026-02-28",
      status: "Cancel",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirm":
        return { bg: "#16A34A", color: "#fff" };
      case "Pending":
        return { bg: "#F59E0B", color: "#000" };
      case "Cancel":
        return { bg: "#DC2626", color: "#fff" };
      default:
        return { bg: "primary.main", color: "#000" };
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      <CardContent>
        <Typography fontWeight={600} mb={2}>
          Recent Bookings
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["User", "Service", "Branch", "Date", "Status"].map((col) => (
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
              {loading
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(5)].map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton height={20} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : bookings.map((booking) => (
                    <TableRow
                      key={booking.id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(212,175,55,0.05)",
                        },
                      }}
                    >
                      <TableCell>{booking.user}</TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>{booking.branch}</TableCell>
                      <TableCell>{booking.date}</TableCell>

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
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
