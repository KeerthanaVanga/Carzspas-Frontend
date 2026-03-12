import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ServiceForm from "../components/services/ServiceForm";
import type { ServiceFormValues } from "../components/services/ServiceForm";

import { useServiceById } from "../hooks/useServiceById";
import {
  useCreateService,
  useUpdateService,
} from "../hooks/useServicesMutations";

export default function ServiceFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const serviceId = id ? Number(id) : undefined;

  const { data: service, isLoading } = useServiceById(serviceId);
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: updateService } = useUpdateService();

  const handleSubmit = async (values: ServiceFormValues) => {
    try {
      if (isEdit && serviceId) {
        await updateService({
          id: serviceId,
          data: {
            name: values.name,
            description: values.description,
            url: values.url,
            images: values.image ? [values.image] : [],
          },
        });
      } else {
        await createService({
          service_name: values.name,
          description: values.description,
          url: values.url,
          images: values.image ? [values.image] : [],
        });
      }

      navigate("/services");
    } catch (error) {
      console.error(error);
    }
  };

  if (isEdit && isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={4}>
        {isEdit ? "Edit Service" : "Add New Service"}
      </Typography>

      <ServiceForm
        initialValues={{
          name: service?.name ?? "",
          description: service?.description ?? "",
          url: service?.url ?? "",
          image: service?.images?.[0] ?? "",
        }}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
