import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Service } from "../../types/service.types";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 20px rgba(212,175,55,0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={service.images?.[0]}
        alt={service.name}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          color="primary.main"
          gutterBottom
        >
          {service.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => window.open(service.url, "_blank")}
        >
          View
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/services/edit/${service.id}`)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
