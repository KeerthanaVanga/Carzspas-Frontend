import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import type { ChatUser } from "../../types/whatsapp.types";
import ChatWindowSkeleton from "./ChatWindowSkeleton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useUserMessages } from "../../hooks/useWhatsapp";

interface Props {
  user: ChatUser | null;
  onBack?: () => void;
}

export default function ChatWindow({ user, onBack }: Props) {
  const { data, isLoading } = useUserMessages(user?.phoneNumber);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [data]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "auto",
    });
  }, [user]);
  if (!user) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* WhatsApp Icon */}
          <WhatsAppIcon
            sx={{
              fontSize: 60,
              color: "primary.main",
              opacity: 0.8,
            }}
          />

          {/* Heading */}
          <Typography variant="h5" fontWeight={700}>
            WhatsApp Conversations
          </Typography>

          {/* Subtitle */}
          <Typography variant="body2" color="text.secondary">
            Select a chat from the sidebar to start messaging.
          </Typography>
        </Box>
      </Box>
    );
  }
  if (isLoading && user) {
    return <ChatWindowSkeleton />;
  }
  const sendMessage = () => {
    if (!input.trim()) return;

    setInput("");
  };

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
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ p: 2, borderBottom: "1px solid #2A2A2A" }}
      >
        <IconButton onClick={onBack} sx={{ display: { md: "none" } }}>
          <ArrowBackIcon sx={{ color: "primary.main" }} />
        </IconButton>

        <Typography fontWeight={600}>{user.name}</Typography>
      </Stack>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,

          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(212,175,55,0.6)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(212,175,55,0.9)",
          },
        }}
      >
        {data?.data.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={{
              id: msg.id,
              senderType: msg.senderType === "ai" ? "ai" : "user",
              message: msg.message,
              createdAt: msg.createdAt,
              messageType: msg.messageType,
              status: msg.status,
              whatsappMessageId: msg.whatsappMessageId,
            }}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}
