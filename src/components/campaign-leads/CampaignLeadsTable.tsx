import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import type { CampaignLead } from "../../types/campaign-leads-types";
import CampaignLeadsTableSkeleton from "./CampaignLeadsTableSkeleton";

interface Props {
  data: CampaignLead[];
  loading: boolean;
}

export default function CampaignLeadsTable({ data, loading }: Props) {
  const columns = [
    "Campaign",
    "Name",
    "Phone",
    "Car Type",
    "Brand",
    "Model",
    "Year",
    "Preferred Date",
    "Preferred Time",
    "Intent",
    "Status",
    "Notes",
    "Created",
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Cold":
        return {
          bg: "#1E3A8A", // dark blue
          color: "#fff",
        };
      case "Warm":
        return {
          bg: "#F59E0B", // orange
          color: "#000",
        };
      case "Hot":
        return {
          bg: "#DC2626", // red
          color: "#fff",
        };
      default:
        return {
          bg: "primary.main", // fallback gold
          color: "#000",
        };
    }
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "background.paper" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
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
          {loading ? (
            <CampaignLeadsTableSkeleton columns={columns.length} />
          ) : (
            data.map((lead) => (
              <TableRow
                key={lead.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.05)",
                  },
                }}
              >
                <TableCell>{lead.campaign_name}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.phone_number}</TableCell>
                <TableCell>{lead.car_type}</TableCell>
                <TableCell>{lead.car_brand}</TableCell>
                <TableCell>{lead.car_model}</TableCell>
                <TableCell>{lead.car_year}</TableCell>
                <TableCell>{lead.preferred_date}</TableCell>
                <TableCell>{lead.preferred_time}</TableCell>
                <TableCell>{lead.user_intent}</TableCell>

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

                <TableCell>{lead.notes}</TableCell>

                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
