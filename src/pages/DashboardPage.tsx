import { Box, Typography, Grid } from "@mui/material";
import DashboardKPI from "../components/dashboard/DashboardKPI";
import LeadsPieChart from "../components/dashboard/LeadsPieChart";
import ServiceBarChart from "../components/dashboard/ServiceBarChart";
import RecentBookingsTable from "../components/dashboard/RecentLeadsTable";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) return <DashboardSkeleton />;

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

        <Grid size={{ xs: 12, md: 6 }}>
          <ServiceBarChart data={data.campaigns} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RecentBookingsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
