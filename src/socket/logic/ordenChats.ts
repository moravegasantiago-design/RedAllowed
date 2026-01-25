import type { ChatsProps } from "../../context/ChatsContext";
import type { lastMessagesProps } from "../hook/useLastMessages";

const orderChats = ({
  chats,
  lastMessages,
}: {
  chats: ChatsProps[];
  lastMessages: lastMessagesProps[];
}) => {
  return lastMessages
    .map((l) => {
      const chat = chats.find((c) => c.chat_id === l.chatId) as ChatsProps;
      return { ...chat, lastMessages: { ...l } };
    })
    .filter(Boolean);
};
export default orderChats;
