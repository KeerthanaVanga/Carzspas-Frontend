import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemText,
  Badge,
} from "@mui/material";
import type { ChatUser } from "../../types/whatsapp.types";

interface Props {
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
}

const dummyUsers: ChatUser[] = [
  { id: 1, name: "Shashi", lastMessage: "Hi, need ceramic coating", unread: 2 },
  { id: 2, name: "Reddy", lastMessage: "Booking confirmed?", unread: 0 },
  { id: 3, name: "Advocate Ahmed", lastMessage: "Price details?", unread: 1 },
];

export default function ChatSidebar({ selectedUser, onSelectUser }: Props) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: 320 },
        borderRight: "1px solid #2A2A2A",
        backgroundColor: "background.paper",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: 600, color: "primary.main" }}
      >
        WhatsApp Chats
      </Typography>

      <List>
        {dummyUsers.map((user) => (
          <ListItemButton
            key={user.id}
            selected={selectedUser?.id === user.id}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(212,175,55,0.1)",
              },
            }}
            onClick={() => onSelectUser(user)}
          >
            <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
              {user.name[0]}
            </Avatar>

            <ListItemText primary={user.name} secondary={user.lastMessage} />

            {user.unread > 0 && (
              <Badge badgeContent={user.unread} color="primary" />
            )}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
