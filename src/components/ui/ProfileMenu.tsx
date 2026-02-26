import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

interface Props {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export default function ProfileMenu({
  anchorEl,
  onClose,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: Props) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 180,
          backgroundColor: "background.paper",
          border: "1px solid #2A2A2A",
        },
      }}
    >
      <MenuItem
        onClick={() => {
          onProfileClick?.();
          onClose();
        }}
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" sx={{ color: "primary.main" }} />
        </ListItemIcon>
        <Typography variant="body2">Profile</Typography>
      </MenuItem>

      <MenuItem
        onClick={() => {
          onSettingsClick?.();
          onClose();
        }}
      >
        <ListItemIcon>
          <SettingsIcon fontSize="small" sx={{ color: "secondary.main" }} />
        </ListItemIcon>
        <Typography variant="body2">Settings</Typography>
      </MenuItem>

      <Divider sx={{ borderColor: "#2A2A2A" }} />

      <MenuItem
        onClick={() => {
          onLogoutClick?.();
          onClose();
        }}
      >
        <ListItemIcon>
          <LogoutIcon
            fontSize="small"
            sx={{ color: "error.main" }} // 🔥 Red logout icon
          />
        </ListItemIcon>
        <Typography variant="body2" sx={{ color: "error.main" }}>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
}
