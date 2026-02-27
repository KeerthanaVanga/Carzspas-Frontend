import { Box, Typography, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../components/services/ServiceCard";
import ServicesSkeleton from "../components/services/ServicesSkeleton";
import type { Service } from "../types/service.types";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setServices([
        {
          id: 1,
          name: "Exterior Detailing",
          description: `Custom Wraps
Looking for a creative/dramatic design on your car? Or may be a colour change?
Looking to give your vehicle a creative, customized design or a complete color transformation? Our car and bike vinyl wrapping services in Hyderabad offer the perfect solution to elevate your vehicle’s look while protecting the original paint. Whether it’s a striking graphic on the bonnet or a full-body color change, our expert team delivers precision, durability, and a flawless finish.

We use high-quality vinyl wrap materials to ensure long-lasting results, providing a cost-effective alternative to repainting while giving your vehicle a unique, eye-catching appearance.`,
          url: "https://carzspas.com/exterior",
          images: [
            "https://carzspas.com/wp-content/uploads/al_opt_content/IMAGE/carzspas.com/wp-content/uploads/2025/08/Screenshot-2025-08-06-173814-1024x472.png.bv_resized_ipad.png.bv.webp?bv_host=carzspas.com",
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Interior Detailing",
          description: `Custom Wraps
Looking for a creative/dramatic design on your car? Or may be a colour change?
Looking to give your vehicle a creative, customized design or a complete color transformation? Our car and bike vinyl wrapping services in Hyderabad offer the perfect solution to elevate your vehicle’s look while protecting the original paint. Whether it’s a striking graphic on the bonnet or a full-body color change, our expert team delivers precision, durability, and a flawless finish.

We use high-quality vinyl wrap materials to ensure long-lasting results, providing a cost-effective alternative to repainting while giving your vehicle a unique, eye-catching appearance.`,
          url: "https://carzspas.com/interior",
          images: [
            "https://carzspas.com/wp-content/uploads/al_opt_content/IMAGE/carzspas.com/wp-content/uploads/2025/08/Screenshot-2025-08-06-173814-1024x472.png.bv_resized_ipad.png.bv.webp?bv_host=carzspas.com",
          ],

          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Paint Protection Film",
          description: `Custom Wraps
Looking for a creative/dramatic design on your car? Or may be a colour change?
Looking to give your vehicle a creative, customized design or a complete color transformation? Our car and bike vinyl wrapping services in Hyderabad offer the perfect solution to elevate your vehicle’s look while protecting the original paint. Whether it’s a striking graphic on the bonnet or a full-body color change, our expert team delivers precision, durability, and a flawless finish.

We use high-quality vinyl wrap materials to ensure long-lasting results, providing a cost-effective alternative to repainting while giving your vehicle a unique, eye-catching appearance.`,
          url: "https://carzspas.com/paint-protection",
          images: [
            "https://carzspas.com/wp-content/uploads/al_opt_content/IMAGE/carzspas.com/wp-content/uploads/2025/08/Screenshot-2025-08-06-173814-1024x472.png.bv_resized_ipad.png.bv.webp?bv_host=carzspas.com",
          ],

          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Box>
      {/* PAGE HEADER */}
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

        <Button variant="contained" onClick={() => navigate("/services/new")}>
          Add Service
        </Button>
      </Box>

      {/* CONTENT */}
      {loading ? (
        <ServicesSkeleton />
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
