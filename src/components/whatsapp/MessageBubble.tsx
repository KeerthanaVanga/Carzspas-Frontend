import { Box, Typography, Stack } from "@mui/material";
import { formatMessageTime } from "../../utils/formatMessageTime";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import type { Message } from "../../types/whatsapp.types";

export default function MessageBubble({ message }: { message: Message }) {
  const isAI = message.senderType === "ai";

  const time = formatMessageTime(message.createdAt);
  const renderStatus = () => {
    if (!isAI) return null;

    if (message.status === "sent") {
      return <DoneIcon sx={{ fontSize: 16 }} />;
    }

    if (message.status === "delivered") {
      return <DoneAllIcon sx={{ fontSize: 16 }} />;
    }

    if (message.status === "read") {
      return (
        <DoneAllIcon
          sx={{
            fontSize: 16,
            color: "#4FC3F7",
          }}
        />
      );
    }

    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAI ? "flex-end" : "flex-start",
        mb: 1.5,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1,
          maxWidth: "70%",
          borderRadius: 2,
          backgroundColor: isAI ? "primary.main" : "#2A2A2A",
          color: isAI ? "#000" : "#fff",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-line",
          }}
        >
          {message.message}
        </Typography>

        <Stack
          direction="row"
          spacing={0.5}
          justifyContent="flex-end"
          alignItems="center"
          mt={0.5}
        >
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {time}
          </Typography>

          {/* Only AI messages show status */}
          {renderStatus()}
        </Stack>
      </Box>
    </Box>
  );
}
