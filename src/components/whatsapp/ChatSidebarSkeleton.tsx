import { Box, Skeleton, Stack } from "@mui/material";

export default function ChatSidebarSkeleton() {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 320 },
        borderRight: "1px solid #2A2A2A",
        backgroundColor: "background.paper",
        p: 2,
      }}
    >
      {/* Title Skeleton */}
      <Skeleton
        width={150}
        height={28}
        sx={{
          mb: 2,
          bgcolor: "rgba(212,175,55,0.15)",
        }}
      />

      <Stack spacing={2}>
        {[...Array(8)].map((_, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center">
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: "rgba(212,175,55,0.15)" }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton
                width="60%"
                height={18}
                sx={{ bgcolor: "rgba(212,175,55,0.12)" }}
              />
              <Skeleton
                width="80%"
                height={14}
                sx={{ bgcolor: "rgba(212,175,55,0.08)" }}
              />
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
