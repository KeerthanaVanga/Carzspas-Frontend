import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { topNavLinks } from "../../config/MenuConfig";
import { drawerWidth, collapsedWidth } from "./drawerStyles";
import logo from "../../assets/carzspas.png";
import ProfileMenu from "./ProfileMenu";
import { NavLink } from "react-router-dom";
interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

export default function Navbar({ open, toggleDrawer }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "primary.main",
        borderBottom: "1px solid #2A2A2A",
        transition: "all 0.3s ease",
        ...(!isMobile && {
          left: open ? drawerWidth : collapsedWidth,
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
        }),
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 🔹 LEFT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>

          <Box
            component="img"
            src={logo}
            alt="CarzSpas Logo"
            sx={{
              height: 32,
              objectFit: "contain",
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              color: "white",
            }}
          >
            CarzSpas Hyderabad
          </Typography>
        </Box>

        {/* 🔹 RIGHT SECTION */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {!isMobile &&
            topNavLinks.map((item) => (
              <Box
                key={item.label}
                component={NavLink}
                to={item.path}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  textDecoration: "none",
                  color: "#fff",
                  fontWeight: 500,
                  transition: "all 0.2s ease",

                  "&.active": {
                    backgroundColor: "rgba(212,175,55,0.15)",
                    color: "secondary.main",
                    "& .MuiSvgIcon-root": {
                      color: "secondary.main",
                    },
                  },

                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.08)",
                    color: "secondary.main",
                    "& .MuiSvgIcon-root": {
                      color: "secondary.main",
                    },
                  },
                }}
              >
                <item.icon
                  fontSize="small"
                  sx={{
                    color: "primary.main", // 👈 gold always
                    transition: "color 0.2s ease",
                  }}
                />

                <Typography sx={{ color: "inherit" }}>{item.label}</Typography>
              </Box>
            ))}

          {/* Avatar */}
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ bgcolor: "primary.main", color: "#000" }}>K</Avatar>
          </IconButton>
        </Box>

        <ProfileMenu
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          onProfileClick={() => console.log("Profile")}
          onSettingsClick={() => console.log("Settings")}
          onLogoutClick={() => console.log("Logout")}
        />
      </Toolbar>
    </AppBar>
  );
}
