import { Grid, Card, CardContent, Typography } from "@mui/material";

interface Props {
  data: {
    totalLeads: number;
    totalBookings: number;
    todayBookings: number;
    todayLeads: number;
  };
}

export default function DashboardKPI({ data }: Props) {
  const items = [
    { label: "Total Leads", value: data.totalLeads },
    { label: "Total Bookings", value: data.totalBookings },
    { label: "Today Bookings", value: data.todayBookings },
    { label: "Today Leads", value: data.todayLeads },
  ];

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
