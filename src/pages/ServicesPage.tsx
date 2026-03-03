import { Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/services/ServiceCard";
import ServicesSkeleton from "../components/services/ServicesSkeleton";
import { useServices } from "../hooks/useService";

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Services
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/services/create")}
        >
          Add Service
        </Button>
      </Box>

      {isLoading ? (
        <ServicesSkeleton />
      ) : (
        <Grid container spacing={3}>
          {services?.map((service) => (
            <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
