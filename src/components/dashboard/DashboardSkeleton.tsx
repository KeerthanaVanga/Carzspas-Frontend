import { Box, Grid, Skeleton } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box>
      <Skeleton width={200} height={40} sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {[...Array(4)].map((_, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Skeleton height={100} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}

        {[...Array(3)].map((_, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <Skeleton height={300} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Skeleton height={200} sx={{ borderRadius: 3 }} />
        </Grid>
      </Grid>
    </Box>
  );
}
