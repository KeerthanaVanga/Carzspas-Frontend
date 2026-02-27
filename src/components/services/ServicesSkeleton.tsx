import { Grid, Card, CardContent, Skeleton } from "@mui/material";

export default function ServicesSkeleton() {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "background.paper" }}>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton height={30} width="60%" />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
