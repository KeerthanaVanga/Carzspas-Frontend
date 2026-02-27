import { Box, TextField, MenuItem } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

type FilterField = "status" | "search" | "dateRange";

type FilterValue = string | [Dayjs | null, Dayjs | null];

interface Props {
  status: string;
  search: string;
  dateRange: [Dayjs | null, Dayjs | null];
  onChange: (field: FilterField, value: FilterValue) => void;
}
export default function BookingsFilters({
  status,
  search,
  dateRange,
  onChange,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Status */}
      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) => onChange("status", e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Confirm">Confirm</MenuItem>
        <MenuItem value="Reschedule">Reschedule</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>

      {/* Search */}
      <TextField
        size="small"
        label="Search Name / Phone"
        value={search}
        onChange={(e) => onChange("search", e.target.value)}
        sx={{ minWidth: 220 }}
      />

      {/* Date Range */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          value={dateRange}
          onChange={(newValue) => onChange("dateRange", newValue)}
          slotProps={{
            textField: { size: "small" },
          }}
          sx={{ minWidth: 250 }}
        />
      </LocalizationProvider>
    </Box>
  );
}
