import { Box, TextField, MenuItem } from "@mui/material";
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
        onChange={(e) => onStatusChange(e.target.value)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Confirmed">Confirmed</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>

      {/* Date Range */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          value={dateRange}
          onChange={(newValue) => onDateChange(newValue)}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          sx={{ minWidth: 250 }}
        />
      </LocalizationProvider>
    </Box>
  );
}
