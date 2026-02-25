import { Button, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthTextField from "./AuthTextField";

interface Props {
  onSwitch: () => void;
}

const SignInForm = ({ onSwitch }: Props) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Minimum 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values) => {
        console.log("Sign In:", values);
      }}
    >
      {() => (
        <Form>
          <Typography variant="h4" mb={2}>
            Sign In
          </Typography>

          <AuthTextField name="email" label="Email" type="email" />
          <AuthTextField name="password" label="Password" type="password" />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #D4AF37, #F5D76E)",
            }}
          >
            Sign In
          </Button>

          <Box mt={2}>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <span
                style={{ color: "#D4AF37", cursor: "pointer" }}
                onClick={onSwitch}
              >
                Sign Up
              </span>
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
