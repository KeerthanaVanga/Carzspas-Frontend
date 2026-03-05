import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import type { ChatUser } from "../../types/whatsapp.types";
import ChatSidebarSkeleton from "./ChatSidebarSkeleton";
import { useWhatsappUsers } from "../../hooks/useWhatsapp";

interface Props {
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
}

export default function ChatSidebar({ selectedUser, onSelectUser }: Props) {
  const { data, isLoading } = useWhatsappUsers();

  if (isLoading) {
    return <ChatSidebarSkeleton />;
  }

  // 🔥 Sort users by latest message time
  const users = [...(data?.data ?? [])].sort(
    (a, b) =>
      new Date(b.lastMessageTime).getTime() -
      new Date(a.lastMessageTime).getTime(),
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 320 },
        borderRight: "1px solid #2A2A2A",
        backgroundColor: "background.paper",
        overflowY: "auto",

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
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: 600, color: "primary.main" }}
      >
        WhatsApp Chats
      </Typography>

      <List>
        {users.map((user) => (
          <ListItemButton
            key={user.phoneNumber}
            selected={selectedUser?.phoneNumber === user.phoneNumber}
            onClick={() => onSelectUser(user)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(212,175,55,0.1)",
              },
            }}
          >
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              {user.name?.[0] ?? "U"}
            </Avatar>

            <ListItemText
              primary={user.name}
              secondary={
                <Tooltip title={user.lastMessage} arrow>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.lastMessage}
                  </Typography>
                </Tooltip>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
