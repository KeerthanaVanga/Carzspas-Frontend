import { Box, FormControl, FormLabel, Grid } from "@mui/material";
import {
  LocalizationProvider,
  DateRangePicker,
  type PickersShortcutsItem,
  type DateRange,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface Props {
  dateRange: [Dayjs | null, Dayjs | null];
  onDateChange: (value: [Dayjs | null, Dayjs | null]) => void;
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

export default function UsersFilters({ dateRange, onDateChange }: Props) {
  return (
    <Box mb={4}>
      <Grid container spacing={2} alignItems="center">
        {/* Status */}

        {/* Date Range */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                mb: 1,
                fontSize: 14,
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              Created Date Range
            </FormLabel>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                value={dateRange}
                onChange={(newValue) => onDateChange(newValue)}
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
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
