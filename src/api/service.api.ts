import api from "../lib/axios-interceptor";
import type { Service, ServicesResponse } from "../types/service.types";

export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<ServicesResponse>("/services");

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const createService = async (data: {
  name: string;
  url?: string;
  images: string[];
  description?: string;
}) => {
  const response = await api.post("/services", data);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const updateService = async (
  id: number,
  data: {
    name?: string;
    url?: string;
    images?: string[];
    description?: string;
  },
) => {
  const response = await api.put(`/services/${id}`, data);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const getServiceById = async (id: number) => {
  const response = await api.get(`/services/${id}`);

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};
