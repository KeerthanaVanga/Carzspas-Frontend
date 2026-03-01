import { Typography, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import AuthTextField from "./AuthTextField";
import AuthLoadingButton from "./AuthLoadingButton";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface Props {
  onSwitch: () => void;
}

const SignUpForm = ({ onSwitch }: Props) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useSignup({
    onSuccess: (response) => {
      console.log(response.message);
      navigate("/", { replace: true });
      enqueueSnackbar(response.message, { variant: "success" });
    },
    onError: (error) => {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });

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
      onSubmit={async (values) => {
        await mutateAsync({
          username: values.name,
          email: values.email,
          password: values.password,
        });
      }}
    >
      {({ isValid, dirty }) => (
        <Form>
          <Typography variant="h4" mb={2}>
            Create Account
          </Typography>

          <AuthTextField
            name="name"
            label="Full Name"
            startIcon={<PersonIcon sx={{ color: "#D4AF37" }} />}
          />
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
          <AuthTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            startIcon={<LockIcon sx={{ color: "#D4AF37" }} />}
          />

          <AuthLoadingButton
            loading={isPending}
            disabled={!dirty || !isValid || isPending}
          >
            Sign Up
          </AuthLoadingButton>

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
