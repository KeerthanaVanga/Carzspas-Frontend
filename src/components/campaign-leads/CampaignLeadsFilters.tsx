import { Box, TextField, MenuItem, Grid } from "@mui/material";

interface Props {
  campaign: string;
  status: string;
  search: string;
  fromDate: string;
  toDate: string;
  campaigns: string[];
  onChange: (field: string, value: string) => void;
}

export default function CampaignLeadsFilters({
  campaign,
  status,
  search,
  fromDate,
  toDate,
  campaigns,
  onChange,
}: Props) {
  return (
    <Box mb={4}>
      <Grid container spacing={3}>
        {/* Campaign */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            select
            label="Campaign"
            value={campaign}
            onChange={(e) => onChange("campaign", e.target.value)}
          >
            <MenuItem value="">All Campaigns</MenuItem>
            {campaigns.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            select
            label="Lead Status"
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Cold">Cold</MenuItem>
            <MenuItem value="Warm">Warm</MenuItem>
            <MenuItem value="Hot">Hot</MenuItem>
          </TextField>
        </Grid>

        {/* From Date */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            type="date"
            label="From Date"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => onChange("fromDate", e.target.value)}
          />
        </Grid>

        {/* To Date */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            type="date"
            label="To Date"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => onChange("toDate", e.target.value)}
          />
        </Grid>

        {/* Search */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Search Name / Phone"
            value={search}
            onChange={(e) => onChange("search", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
