import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import type { CampaignLead } from "../../types/campaign-leads-types";
import CampaignLeadsTableSkeleton from "./CampaignLeadsTableSkeleton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useUpdateLeadStatus } from "../../hooks/useCampaignLeads";
import { useState } from "react";
import { useSnackbar } from "notistack";

interface Props {
  data: CampaignLead[];
  loading: boolean;
}

export default function CampaignLeadsTable({ data, loading }: Props) {
  const columns = [
    "Campaign",
    "Name",
    "Phone",
    "Type",
    "Brand",
    "Model",
    "Year",
    "Preferred Slot",
    "Intent",
    "Status",
    "Notes",
    "Created",
    "Contact",
  ];

  const { mutate: updateStatus } = useUpdateLeadStatus();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleContactToggle = (lead: CampaignLead) => {
    const newStatus = lead.lead_status === "Contacted" ? "Cold" : "Contacted";

    setUpdatingId(lead.id);

    updateStatus(
      {
        id: lead.id,
        lead_status: newStatus,
      },
      {
        onSuccess: () => {
          enqueueSnackbar(`Lead status updated to ${newStatus}`, {
            variant: "success",
          });
        },
        onError: () => {
          enqueueSnackbar("Failed to update lead status", {
            variant: "error",
          });
        },
        onSettled: () => {
          setUpdatingId(null);
        },
      },
    );
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Cold":
        return { bg: "#1E3A8A", color: "#fff" };
      case "Warm":
        return { bg: "#F59E0B", color: "#000" };
      case "Hot":
        return { bg: "#DC2626", color: "#fff" };
      case "Contacted":
        return { bg: "#16A34A", color: "#fff" }; // green
      default:
        return { bg: "primary.main", color: "#000" };
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
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Box
                  sx={{
                    py: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  {/* Icon */}
                  <InboxIcon
                    sx={{
                      fontSize: 48,
                      color: "primary.main",
                      opacity: 0.7,
                    }}
                  />

                  {/* Title */}
                  <Typography variant="h6" fontWeight={600}>
                    No Campaign Leads Found
                  </Typography>

                  {/* Subtitle */}
                  <Typography variant="body2" color="text.disabled">
                    There are no leads to display right now.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            data.map((lead) => {
              return (
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
                  <TableCell>
                    {lead.preferred_date && lead.preferred_time
                      ? `${dayjs(lead.preferred_date).format("DD MMM YYYY")} | ${dayjs(
                          lead.preferred_time,
                        ).format("hh:mm A")}`
                      : "-"}
                  </TableCell>
                  <TableCell>{lead.user_intent}</TableCell>

                  {/* Status */}
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

                  {/* Contact */}
                  <TableCell>
                    <IconButton
                      onClick={() => handleContactToggle(lead)}
                      disabled={updatingId === lead.id}
                      sx={{
                        color:
                          lead.lead_status === "Contacted"
                            ? "#16A34A"
                            : "primary.main",
                      }}
                    >
                      {updatingId === lead.id ? (
                        <CircularProgress size={20} />
                      ) : lead.lead_status === "Contacted" ? (
                        <CheckCircleIcon />
                      ) : (
                        <PhoneIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
