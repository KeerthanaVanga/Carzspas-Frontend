import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  type?: string;
}

const AuthTextField = ({ name, label, type = "text" }: Props) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      fullWidth
      {...field}
      label={label}
      type={type}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      margin="normal"
    />
  );
};

export default AuthTextField;
