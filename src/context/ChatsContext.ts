import { createContext } from "react";

export type ChatsProps = {
  user_id: number;
  chat_id: number;
  created_at: string;
  friend: string;
  friendPhoto: string;
  friendBio: string | null;
  friendJob: string;
  friendBirthDay: string;
  friendTime: string;
};
const ChatsContext = createContext<ChatsProps[]>([]);
export default ChatsContext;
