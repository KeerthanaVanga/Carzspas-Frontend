import { Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthTextField from "./AuthTextField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AuthLoadingButton from "./AuthLoadingButton";

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
      onSubmit={async (values, { setSubmitting }) => {
        try {
          console.log("Sign In:", values);

          // simulate API
          await new Promise((res) => setTimeout(res, 1500));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form>
          <Typography variant="h4" mb={2}>
            Sign In
          </Typography>

          <AuthTextField
            name="email"
            label="Email"
            type="email"
            startIcon={<EmailIcon sx={{ color: "#D4AF37" }} />}
          />

          <AuthTextField
            name="password"
            label="Password"
            type="password"
            startIcon={<LockIcon sx={{ color: "#D4AF37" }} />}
          />

          <AuthLoadingButton
            loading={isSubmitting}
            disabled={!dirty || !isValid || isSubmitting}
          >
            Sign In
          </AuthLoadingButton>

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
