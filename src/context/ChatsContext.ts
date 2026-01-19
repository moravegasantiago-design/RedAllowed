import { createContext } from "react";

export type ChatsProps = {
  user_id: string;
  chat_id: string;
  created_at: Date;
  friend: string;
  friendPhoto: string;
  friendBio: string | null;
  friendJob: string;
  friendBirthDay: string;
  friendTime: string;
};
const ChatsContext = createContext<ChatsProps[]>([]);
export default ChatsContext;
