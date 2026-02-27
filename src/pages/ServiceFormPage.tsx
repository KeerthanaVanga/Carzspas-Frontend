import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "../components/services/ServiceForm";
import type { ServiceFormValues } from "../components/services/ServiceForm";

export default function ServiceFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const handleSubmit = (values: ServiceFormValues) => {
    console.log(values);
    navigate("/services");
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={4}>
        {isEdit ? "Edit Service" : "Add New Service"}
      </Typography>

      <ServiceForm
        initialValues={{
          name: "",
          description: "",
          url: "",
          image: "",
        }}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
