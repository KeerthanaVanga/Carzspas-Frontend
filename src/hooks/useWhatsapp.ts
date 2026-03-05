import { useQuery } from "@tanstack/react-query";
import { getWhatsappUsers, getUserMessages } from "../api/whatsapp.api";

export const useWhatsappUsers = () => {
  return useQuery({
    queryKey: ["whatsapp-users"],
    queryFn: getWhatsappUsers,
  });
};

export const useUserMessages = (phoneNumber?: string) => {
  return useQuery({
    queryKey: ["whatsapp-messages", phoneNumber],
    queryFn: () => getUserMessages(phoneNumber!),
    enabled: Boolean(phoneNumber),
  });
};
