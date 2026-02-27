import { Box, Button, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";

/* ✅ Strict Form Values Type */
export interface ServiceFormValues {
  name: string;
  description: string;
  url: string;
  image: string;
}

interface Props {
  initialValues: ServiceFormValues;
  onSubmit: (
    values: ServiceFormValues,
    helpers: FormikHelpers<ServiceFormValues>,
  ) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Service name is required"),
  description: Yup.string().required("Description is required"),
  url: Yup.string().url("Enter valid URL").required("URL required"),
  image: Yup.string()
    .url("Enter valid image URL")
    .required("Image URL required"),
});

export default function ServiceForm({ initialValues, onSubmit }: Props) {
  return (
    <Formik<ServiceFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Service Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="URL"
                name="url"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.url && Boolean(errors.url)}
                helperText={touched.url && errors.url}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.image && Boolean(errors.image)}
                helperText={touched.image && errors.image}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Button type="submit" variant="contained">
              Save Service
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
