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

interface Props {
  user: ChatUser | null;
  onBack: () => void;
}

export default function ChatWindow({ user, onBack }: Props) {
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
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Typography color="primary.main">
          Select a chat to start messaging
        </Typography>
      </Box>
    );
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
