import type { ChatsProps } from "../../context/ChatsContext";
import type { lastMessagesProps } from "../hook/useLastMessages";

const orderChats = ({
  chats,
  lastMessages,
}: {
  chats: ChatsProps[];
  lastMessages: lastMessagesProps[];
}) =>
  chats.map((c) => ({
    ...c,
    lastMessages: lastMessages.find((l) => l.chatId === c.chat_id) ?? null,
  }));
export default orderChats;
