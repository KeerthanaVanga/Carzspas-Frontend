import { Box, LinearProgress } from "@mui/material";

interface Props {
  imageSrc: string;
}

export default function FullScreenLoader({ imageSrc }: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top Linear Progress */}
      <LinearProgress
        sx={{
          height: 4,
          backgroundColor: "rgba(255,255,255,0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "primary.main",
          },
        }}
      />

      {/* Center Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt="Loading"
          sx={{
            width: 120,
            height: 120,
            objectFit: "contain",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      </Box>

      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.7; }
          }
        `}
      </style>
    </Box>
  );
}
