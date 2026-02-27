export interface ChatUser {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
}

export interface Message {
  id: number;
  sender: "admin" | "user";
  text: string;
  created_at: string;
}
