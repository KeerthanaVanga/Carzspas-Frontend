import { Button, Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthTextField from "./AuthTextField";

interface Props {
  onSwitch: () => void;
}

const SignUpForm = ({ onSwitch }: Props) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Minimum 6 characters")
          .required("Password required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm your password"),
      })}
      onSubmit={(values) => {
        console.log("Sign Up:", values);
      }}
    >
      {() => (
        <Form>
          <Typography variant="h4" mb={2}>
            Create Account
          </Typography>

          <AuthTextField name="name" label="Full Name" />
          <AuthTextField name="email" label="Email" type="email" />
          <AuthTextField name="password" label="Password" type="password" />
          <AuthTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #D4AF37, #F5D76E)",
            }}
          >
            Sign Up
          </Button>

          <Box mt={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <span
                style={{ color: "#D4AF37", cursor: "pointer" }}
                onClick={onSwitch}
              >
                Sign In
              </span>
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
