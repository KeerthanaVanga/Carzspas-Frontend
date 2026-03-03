import { Box, Typography, TablePagination } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import CampaignLeadsTable from "../components/campaign-leads/CampaignLeadsTable";
import CampaignLeadsFilters from "../components/campaign-leads/CampaignLeadsFilters";
import { useCampaignLeads, useCampaignNames } from "../hooks/useCampaignLeads";

export default function CampaignLeadsPage() {
  const [page, setPage] = useState<number>(0); // MUI 0-based
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [filters, setFilters] = useState({
    campaign: "",
    status: "",
    search: "",
    dateRange: [null, null] as [Dayjs | null, Dayjs | null],
  });

  const { data: campaigns = [] } = useCampaignNames();

  const { data, isLoading } = useCampaignLeads({
    page: page + 1,
    limit: rowsPerPage,
    campaign_name: filters.campaign || undefined,
    lead_status: filters.status || undefined,
    search: filters.search || undefined,
    fromDate: filters.dateRange[0]?.startOf("day").toISOString(),
    toDate: filters.dateRange[1]?.endOf("day").toISOString(),
  });

  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Campaign Leads
      </Typography>

      <CampaignLeadsFilters
        campaign={filters.campaign}
        status={filters.status}
        search={filters.search}
        dateRange={filters.dateRange}
        campaigns={campaigns}
        onChange={(field, value) => {
          setPage(0);

          if (field === "campaign" && typeof value === "string")
            setFilters((prev) => ({ ...prev, campaign: value }));

          if (field === "status" && typeof value === "string")
            setFilters((prev) => ({ ...prev, status: value }));

          if (field === "search" && typeof value === "string")
            setFilters((prev) => ({ ...prev, search: value }));

          if (field === "dateRange" && Array.isArray(value))
            setFilters((prev) => ({ ...prev, dateRange: value }));
        }}
      />

      <CampaignLeadsTable data={data?.data ?? []} loading={isLoading} />

      <TablePagination
        component="div"
        count={data?.meta.total ?? 0}
        page={page}
        onPageChange={(_, newPage: number) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Box>
  );
}
