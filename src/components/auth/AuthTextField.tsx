import { useState } from "react";
import type { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useField } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface Props {
  name: string;
  label: string;
  type?: string;
  startIcon?: ReactNode; // 👈 flexible icon prop
}

const AuthTextField = ({ name, label, type = "text", startIcon }: Props) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isError = meta.touched && Boolean(meta.error);
  const isPassword = type === "password";

  return (
    <TextField
      fullWidth
      {...field}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      label={label}
      placeholder={`Enter ${label}`}
      error={isError}
      helperText={isError ? meta.error : " "}
      autoComplete="off"
      margin="normal"
      slotProps={{
        formHelperText: {
          sx: {
            minHeight: 20,
          },
        },
        input: {
          startAdornment: startIcon && (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff sx={{ color: "#D4AF37" }} />
                ) : (
                  <Visibility sx={{ color: "#D4AF37" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default AuthTextField;
