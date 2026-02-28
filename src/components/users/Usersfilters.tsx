import { Box, Grid } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";

interface Props {
  dateRange: [Dayjs | null, Dayjs | null];
  onDateChange: (value: [Dayjs | null, Dayjs | null]) => void;
}

export default function UsersFilters({ dateRange, onDateChange }: Props) {
  return (
    <Box mb={4}>
      <Grid container spacing={2} alignItems="center">
        {/* Date Range */}
        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              disableFuture
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
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
