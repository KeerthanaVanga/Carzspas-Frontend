import { useTheme } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import logo from "../../assets/carzspas.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink } from "react-router-dom";
import { sideNavLinks, topNavLinks } from "../../config/MenuConfig";
import { drawerWidth, collapsedWidth } from "./drawerStyles";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

export default function Sidebar({ open, toggleDrawer }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = isMobile ? [...topNavLinks, ...sideNavLinks] : sideNavLinks;

  return (
    <MuiDrawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: isMobile ? drawerWidth : open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMobile ? drawerWidth : open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          backgroundColor: "background.paper",
          borderRight: "1px solid #2A2A2A",
        },
      }}
    >
      {/* 🔥 HEADER FIXED AT TOP */}
      <Box
        sx={{
          ...theme.mixins.toolbar,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: 2,
        }}
      >
        {/* Logo Section */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            component="img"
            src={logo}
            alt="CarzSpas Logo"
            sx={{
              height: open ? 36 : 28,
              transition: "all 0.3s ease",
              objectFit: "contain",
            }}
          />

          {(open || isMobile) && <Typography variant="h6">CarzSpas</Typography>}
        </Box>

        {!isMobile && open && (
          <IconButton size="small" onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.label}
            title={!open && !isMobile ? item.label : ""}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                justifyContent: open || isMobile ? "initial" : "center",
                px: 2.5,
                color: "#fff",
                textDecoration: "none",
                transition: "all 0.2s ease",

                "&.active": {
                  backgroundColor: "rgba(212,175,55,0.15)",
                  color: "secondary.main",
                  "& .MuiListItemIcon-root": {
                    color: "secondary.main",
                  },
                },

                "&:hover": {
                  backgroundColor: "rgba(212,175,55,0.08)",
                  color: "secondary.main",
                  "& .MuiListItemIcon-root": {
                    color: "secondary.main",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open || isMobile ? 3 : "auto",
                  justifyContent: "center",
                  color: "primary.main", // 👈 GOLD always
                  transition: "color 0.2s ease",
                }}
              >
                <item.icon fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                sx={{
                  opacity: open || isMobile ? 1 : 0,
                  "& .MuiTypography-root": {
                    color: "inherit",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </MuiDrawer>
  );
}
