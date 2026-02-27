import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import ChatSkeleton from "./ChatSkeleton";
import type { ChatUser } from "../../types/whatsapp.types";

export default function ChatLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadLeads = () => {
    console.log("Download leads clicked");
  };

  if (loading) return <ChatSkeleton />;

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, pt: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        mb={3}
        gap={2}
      >
        {/* LEFT SIDE */}
        <Typography variant="h4" fontWeight={700} color="primary.main">
          WhatsApp Bot
        </Typography>

        {/* RIGHT SIDE */}
        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
          {/* Today Leads */}
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Today Leads
            </Typography>
            <Typography fontWeight={700} color="primary.main">
              12
            </Typography>
          </Box>

          {/* Total Leads */}
          <Box
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Total Leads
            </Typography>
            <Typography fontWeight={700} color="primary.main">
              248
            </Typography>
          </Box>

          {/* Download Button */}
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              px: 3,
              fontWeight: 600,
            }}
            onClick={handleDownloadLeads}
          >
            Download Leads
          </Button>
        </Stack>
      </Stack>
      {/* 🔥 CHAT CONTAINER */}
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 180px)",
          backgroundColor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #2A2A2A",
        }}
      >
        {(!isMobile || !selectedUser) && (
          <ChatSidebar
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
        )}

        {(!isMobile || selectedUser) && (
          <ChatWindow
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
          />
        )}
      </Box>
    </Box>
  );
}
