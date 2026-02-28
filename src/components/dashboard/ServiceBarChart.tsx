import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

interface Props {
  data: {
    service: string;
    value: number;
  }[];
}

export default function ServiceBarChart({ data }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography fontWeight={600} mb={2}>
          Campaigns
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: data.map((d: Props["data"][0]) => d.service),
            },
          ]}
          series={[
            {
              data: data.map((d: Props["data"][0]) => d.value),
            },
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}
