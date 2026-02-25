import { Button, CircularProgress } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

interface Props {
  children: React.ReactNode;
  loading: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const AuthLoadingButton = ({ children, loading, disabled, sx }: Props) => {
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      disabled={disabled || loading}
      sx={{
        mt: 3,
        height: 60,
        borderRadius: 4,
        fontWeight: 700,
        fontSize: 18,
        backgroundColor: "#B8922F",
        color: "#000",
        position: "relative",

        "&:hover": {
          backgroundColor: "#C9A227",
        },

        "&.Mui-disabled": {
          backgroundColor: "#B8922F",
          color: "#000",
          opacity: 1,
        },

        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress
          size={26}
          sx={{
            color: "#000",
          }}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default AuthLoadingButton;
