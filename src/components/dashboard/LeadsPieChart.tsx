import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#5A6FF0", "#F6C358", "#FF5C6C", "#5BC0EB"];

export default function LeadsPieChart({ data }: Props) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formattedData = data.map((item, index) => ({
    id: index,
    value: item.value,
    label: item.name,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      <CardContent>
        <Typography fontWeight={600} mb={3}>
          Leads Distribution
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {/* 🔹 CENTER - Pie Chart */}
          <PieChart
            height={260}
            width={260}
            series={[
              {
                data: formattedData,
                innerRadius: 70,
                outerRadius: 110,
                paddingAngle: 1,
                cornerRadius: 4,
              },
            ]}
          />

          {/* 🔹 RIGHT SIDE - Percentages */}
          <Stack spacing={1} alignItems="flex-end">
            {formattedData.map((item) => {
              const percentage =
                total === 0 ? 0 : Math.round((item.value / total) * 100);

              return (
                <Typography key={item.id} fontWeight={500} color="primary.main">
                  {percentage}%
                </Typography>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
