import type { ChatsProps } from "../../context/ChatsContext";
import type { lastMessagesProps } from "../hook/useLastMessages";

const orderChats = ({
  chats,
  lastMessages,
}: {
  chats: ChatsProps[];
  lastMessages: lastMessagesProps[];
}) => {
  return lastMessages.length
    ? lastMessages
        .map((l) => {
          const chat = chats.find((c) => c.chat_id === l.chatId) as ChatsProps;
          return { ...chat, lastMessages: { ...l } };
        })
        .filter(Boolean)
    : chats.map((c) => ({
        ...c,
        lastMessages: {
          chatId: c.chat_id,
          id: "",
          userId: c.user_id,
          content: "",
          status: "sent" as "sent" | "delivered" | "seen",
          date: "",
          unreadMessages: 0,
        },
      }));
};
export default orderChats;
