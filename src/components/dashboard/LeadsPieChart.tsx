import { Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function LeadsPieChart({ data }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography fontWeight={600} mb={2}>
          Leads Distribution
        </Typography>

        <PieChart
          series={[
            {
              data,
              innerRadius: 50,
              outerRadius: 100,
            },
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
