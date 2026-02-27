import { Box, Grid, TextField, MenuItem } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

interface Props {
  status: string;
  dateRange: [Dayjs | null, Dayjs | null];
  onStatusChange: (value: string) => void;
  onDateChange: (value: [Dayjs | null, Dayjs | null]) => void;
}

export default function UsersFilters({
  status,
  dateRange,
  onStatusChange,
  onDateChange,
}: Props) {
  return (
    <Box mb={3}>
      <Grid container spacing={2}>
        {/* Status Filter */}
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            select
            label="Filter by Status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </Grid>

        {/* Date Range */}
        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={(newValue) => onDateChange(newValue)}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
