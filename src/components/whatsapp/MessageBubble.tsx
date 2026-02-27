import { Box, Typography } from "@mui/material";
import type { Message } from "../../types/whatsapp.types";

export default function MessageBubble({ message }: { message: Message }) {
  const isAdmin = message.sender === "admin";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAdmin ? "flex-end" : "flex-start",
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1,
          maxWidth: "70%",
          borderRadius: 2,
          backgroundColor: isAdmin ? "primary.main" : "#2A2A2A",
          color: isAdmin ? "#000" : "#fff",
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
      </Box>
    </Box>
  );
}
