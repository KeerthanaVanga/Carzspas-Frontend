import { Box, Skeleton, Stack } from "@mui/material";

export default function ChatWindowSkeleton() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid #2A2A2A",
          backgroundColor: "background.paper",
        }}
      >
        <Skeleton
          width={140}
          height={26}
          sx={{ bgcolor: "rgba(212,175,55,0.15)" }}
        />
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Stack spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={index % 2 === 0 ? "55%" : "40%"}
              height={38}
              sx={{
                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                borderRadius: 2,
                bgcolor: "rgba(212,175,55,0.10)",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #2A2A2A",
          backgroundColor: "background.paper",
        }}
      >
        <Skeleton
          variant="rounded"
          height={44}
          sx={{ borderRadius: 2, bgcolor: "rgba(212,175,55,0.12)" }}
        />
      </Box>
    </Box>
  );
}
