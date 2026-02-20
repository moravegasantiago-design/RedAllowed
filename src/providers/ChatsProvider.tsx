import { type ReactNode } from "react";
import useChats from "../socket/hook/useChats";
import ChatsContext from "../context/ChatsContext";

const ChatsProvider = ({ children }: { children: ReactNode }) => {
  const { chats } = useChats();

  return (
    <ChatsContext.Provider value={chats}>{children}</ChatsContext.Provider>
  );
};
export default ChatsProvider;
