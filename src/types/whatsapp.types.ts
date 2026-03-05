export interface ChatUser {
  name: string;
  phoneNumber: string;
  lastMessage: string;
  lastMessageTime: string;
}

export interface Message {
  id: string;
  message: string;
  senderType: "ai" | "user";
  messageType: string;
  createdAt: string;
  status: string;
  whatsappMessageId: string;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  todayUsers: number;
  data: ChatUser[];
}

export interface MessagesResponse {
  success: boolean;
  phoneNumber: string;
  totalMessages: number;
  data: Message[];
}
