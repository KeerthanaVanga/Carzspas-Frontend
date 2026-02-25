import { Box, GridLegacy as Grid, Typography } from "@mui/material";
import { useState } from "react";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import Logo from "../assets/carzspas.png"; // adjust path

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* LEFT SIDE */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="CarzSpas Logo"
          sx={{ width: 200, mb: 4 }}
        />

        <Typography variant="h3" color="primary" gutterBottom>
          Welcome to CarzSpas
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 400 }}>
          Experience premium car detailing with luxury care. Protect your
          vehicle with ceramic coating, spa washes, and professional detailing
          services.
        </Typography>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          background: "background.paper",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            p: 3,
            borderRadius: 3,
            background: "background.paper",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 0 40px rgba(212,175,55,0.08)",
          }}
        >
          {isSignUp ? (
            <SignUpForm onSwitch={() => setIsSignUp(false)} />
          ) : (
            <SignInForm onSwitch={() => setIsSignUp(true)} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
