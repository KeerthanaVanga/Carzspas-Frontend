import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import type { DateRange } from "@mui/x-date-pickers-pro/models";

type FilterField = "status" | "search" | "dateRange";
type FilterValue = string | [Dayjs | null, Dayjs | null];

interface Props {
  status: string;
  search: string;
  dateRange: [Dayjs | null, Dayjs | null];
  onChange: (field: FilterField, value: FilterValue) => void;
}

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "Today",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("day"), today.endOf("day")];
    },
  },
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

export default function BookingsFilters({
  status,
  search,
  dateRange,
  onChange,
}: Props) {
  return (
    <Box mb={4}>
      <Grid container spacing={2} alignItems="center">
        {/* Status */}
        <Grid size={{ xs: 12, md: 2.4 }}>
          <TextField
            fullWidth
            select
            label="Status"
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Confirm">Confirm</MenuItem>
            <MenuItem value="Reschedule">Reschedule</MenuItem>
            <MenuItem value="Cancel">Cancel</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
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
                shortcuts: {
                  items: shortcutsItems,
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
