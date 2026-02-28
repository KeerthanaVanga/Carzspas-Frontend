import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardKPI from "../components/dashboard/DashboardKPI";
import LeadsPieChart from "../components/dashboard/LeadsPieChart";
//import BookingTrendChart from "../components/dashboard/BookingTrendChart";
import ServiceBarChart from "../components/dashboard/ServiceBarChart";
import RecentBookingsTable from "../components/dashboard/RecentBookingsTable";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

interface DashboardData {
  totalLeads: number;
  totalBookings: number;
  todayBookings: number;
  todayLeads: number;
  leadStatus: {
    name: string;
    value: number;
  }[];
  bookingsTrend: number[];
  services: {
    service: string;
    value: number;
  }[];
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    totalLeads: 0,
    totalBookings: 0,
    todayBookings: 0,
    todayLeads: 0,
    leadStatus: [
      { name: "Cold", value: 0 },
      { name: "Warm", value: 0 },
      { name: "Hot", value: 0 },
      { name: "Contacted", value: 0 },
    ],
    bookingsTrend: [0, 0, 0, 0, 0, 0, 0],
    services: [
      { service: "Exterior", value: 0 },
      { service: "Interior", value: 0 },
      { service: "PPF", value: 0 },
      { service: "Ceramic", value: 0 },
    ],
  });

  useEffect(() => {
    setTimeout(() => {
      setData({
        totalLeads: 248,
        totalBookings: 126,
        todayBookings: 12,
        todayLeads: 51,
        leadStatus: [
          { name: "Cold", value: 120 },
          { name: "Warm", value: 80 },
          { name: "Hot", value: 30 },
          { name: "Contacted", value: 18 },
        ],
        bookingsTrend: [2, 4, 5, 3, 6, 8, 12],
        services: [
          { service: "Exterior", value: 45 },
          { service: "Interior", value: 30 },
          { service: "PPF", value: 20 },
          { service: "Ceramic", value: 31 },
        ],
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid size={{ xs: 12 }}>
          <DashboardKPI data={data} />
        </Grid>

        {/* Charts */}
        <Grid size={{ xs: 12, md: 6 }}>
          <LeadsPieChart data={data.leadStatus} />
        </Grid>

        {/* <Grid size={{ xs: 12, md: 6 }}>
          <BookingTrendChart data={data.bookingsTrend} />
        </Grid> */}

        <Grid size={{ xs: 12, md: 6 }}>
          <ServiceBarChart data={data.services} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RecentBookingsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
