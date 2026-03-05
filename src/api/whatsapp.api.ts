import api from "../lib/axios-interceptor";
import type { UsersResponse, MessagesResponse } from "../types/whatsapp.types";

export const getWhatsappUsers = async () => {
  const res = await api.get<UsersResponse>("/whatsapp/users");

  if (!res.data.success) {
    throw new Error("Failed to fetch users");
  }

  return res.data;
};

export const getUserMessages = async (phoneNumber: string) => {
  const res = await api.get<MessagesResponse>(
    `/whatsapp/users/${phoneNumber}/messages`,
  );

  if (!res.data.success) {
    throw new Error("Failed to fetch messages");
  }

  return res.data;
};
