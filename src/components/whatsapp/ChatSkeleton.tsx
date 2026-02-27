import { Box } from "@mui/material";
import ChatSidebarSkeleton from "./ChatSidebarSkeleton";
import ChatWindowSkeleton from "./ChatWindowSkeleton";

export default function ChatSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 180px)",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #2A2A2A",
      }}
    >
      <ChatSidebarSkeleton />
      <ChatWindowSkeleton />
    </Box>
  );
}
