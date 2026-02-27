import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface Props {
  data: number[];
}

export default function BookingTrendChart({ data }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography fontWeight={600} mb={2}>
          Bookings - Last 7 Days
        </Typography>

        <LineChart
          xAxis={[{ data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }]}
          series={[{ data }]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
