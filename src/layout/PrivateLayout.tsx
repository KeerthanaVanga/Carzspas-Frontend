import { useState } from "react";
import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { useMe } from "../hooks/useAuth";
import { ROUTES } from "../routes/path.route";
import FullScreenLoader from "../components/ui/FullScreenLoader";
import logo from "../assets/carzspas.png";

export default function PrivateLayout() {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = useMe();

  if (isLoading) return <FullScreenLoader imageSrc={logo} />;

  if (data?.isLoggedIn !== true) {
    return <Navigate to={ROUTES.AUTHENTICATION} replace />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} toggleDrawer={() => setOpen(!open)} />
      <Sidebar open={open} toggleDrawer={() => setOpen(!open)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
          minHeight: "100vh",
          transition: "margin 0.3s ease",
        }}
      >
        {/* ✅ THIS FIX PUSHES CONTENT BELOW NAVBAR */}
        <Box sx={(theme) => theme.mixins.toolbar} />

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
