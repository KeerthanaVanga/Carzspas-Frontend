import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import MessageBubble from "./MessageBubble";
import type { ChatUser, Message } from "../../types/whatsapp.types";
import ChatWindowSkeleton from "./ChatWindowSkeleton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface Props {
  user: ChatUser | null;
  onBack?: () => void;
  loading?: boolean;
}

export default function ChatWindow({ user, onBack, loading = false }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "user",
      text: "Hi, I want PPF service.",
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      sender: "admin",
      text: "Sure sir, which car model?",
      created_at: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState("");

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
  if (loading && user) {
    return <ChatWindowSkeleton />;
  }
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: "admin",
        text: input,
        created_at: new Date().toISOString(),
      },
    ]);

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
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
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
