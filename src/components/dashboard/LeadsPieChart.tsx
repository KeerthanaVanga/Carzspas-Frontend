import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = ["#5A6FF0", "#F6C358", "#FF5C6C", "#4EC9F5"];

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
          gap={4}
        >
          <PieChart
            height={280}
            width={280}
            series={[
              {
                data: formattedData,
                innerRadius: 70,
                outerRadius: 110,
                paddingAngle: 3,
                cornerRadius: 6,
              },
            ]}
            slotProps={{
              legend: {
                hidden: true, // ✅ This removes default legend
              },
            }}
          />
          {/* 🔥 Custom Legend */}
          <Stack spacing={2}>
            {formattedData.map((item) => {
              const percentage =
                total === 0 ? 0 : Math.round((item.value / total) * 100);

              return (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  {/* Color Dot */}
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                    }}
                  />

                  {/* Label */}
                  <Typography sx={{ minWidth: 80 }}>{item.label}</Typography>

                  {/* Percentage */}
                  <Typography fontWeight={600} color="primary.main">
                    {percentage}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
