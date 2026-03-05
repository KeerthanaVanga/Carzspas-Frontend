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
import { useHotLeads } from "../../hooks/useHotLeads";

export default function RecentCampaignLeadsTable() {
  const { data: leads = [], isLoading } = useHotLeads();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return { bg: "#DC2626", color: "#fff" };
      case "Warm":
        return { bg: "#F59E0B", color: "#000" };
      case "Cold":
        return { bg: "#1E3A8A", color: "#fff" };
      case "Contacted":
        return { bg: "#16A34A", color: "#fff" };
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
          Recent Hot Campaign Leads
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["Name", "Phone", "Car", "Campaign", "Status"].map((col) => (
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
              {/* Loading Skeleton */}
              {isLoading &&
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(5)].map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {/* Empty State */}
              {!isLoading && leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No Hot Leads Found
                  </TableCell>
                </TableRow>
              )}

              {/* Leads Data */}
              {!isLoading &&
                leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(212,175,55,0.05)",
                      },
                    }}
                  >
                    <TableCell>{lead.name}</TableCell>

                    <TableCell>{lead.phone_number}</TableCell>

                    <TableCell>
                      {lead.car_brand} {lead.car_model}
                    </TableCell>

                    <TableCell>{lead.campaign_name}</TableCell>

                    <TableCell>
                      <Chip
                        label={lead.lead_status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(lead.lead_status).bg,
                          color: getStatusColor(lead.lead_status).color,
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
