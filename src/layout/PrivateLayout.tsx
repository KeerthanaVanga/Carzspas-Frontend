import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";

export default function PrivateLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} toggleDrawer={() => setOpen(!open)} />
      <Sidebar open={open} toggleDrawer={() => setOpen(!open)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.default",
          minHeight: "100vh",
          transition: "margin 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
