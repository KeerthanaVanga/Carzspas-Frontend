import { Grid, TextField, MenuItem, Box } from "@mui/material";

interface Props {
  status: string;
  search: string;
  onChange: (field: string, value: string) => void;
}

export default function BookingsFilters({ status, search, onChange }: Props) {
  return (
    <Box mb={4}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            select
            label="Booking Status"
            value={status}
            onChange={(e) => onChange("status", e.target.value)}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Confirm">Confirm</MenuItem>
            <MenuItem value="Reschedule">Reschedule</MenuItem>
            <MenuItem value="Cancel">Cancel</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
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
