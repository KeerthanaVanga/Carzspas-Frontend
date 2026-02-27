import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

type FilterField = "campaign" | "status" | "search" | "dateRange";

type FilterValue = string | [Dayjs | null, Dayjs | null];

interface Props {
  campaign: string;
  status: string;
  search: string;
  dateRange: [Dayjs | null, Dayjs | null];
  campaigns: string[];
  onChange: (field: FilterField, value: FilterValue) => void;
}

export default function CampaignLeadsFilters({
  campaign,
  status,
  search,
  dateRange,
  campaigns,
  onChange,
}: Props) {
  return (
    <Box mb={4}>
      <Grid container spacing={2} alignItems="center">
        {/* Campaign */}
        <Grid size={{ xs: 12, md: 2.4 }}>
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
        <Grid size={{ xs: 12, md: 2.4 }}>
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
            <MenuItem value="Contacted">Contacted</MenuItem>
          </TextField>
        </Grid>

        {/* Date Range */}
        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={(newValue) => onChange("dateRange", newValue)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(212,175,55,0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        {/* Search */}
        <Grid size={{ xs: 12, md: 3.2 }}>
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
