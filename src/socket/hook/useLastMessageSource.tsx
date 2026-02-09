import { useCallback, useMemo } from "react";
import type { chatProps } from "../../components/home/Home";
import type { messagesProps } from "./useMessages";
import type { lastMessagesProps } from "./useLastMessages";

const useLastMessageSource = ({
  messagesSocket,
  chat,
  id,
}: {
  messagesSocket: messagesProps[];
  chat: chatProps;
  id?: number;
}) => {
  const handlerMessage = useCallback(
    ({
      object,
      messages,
    }: {
      object: lastMessagesProps | messagesProps;
      messages?: messagesProps[];
    }) => {
      const unreadMessages =
        object && "unreadmessages" in object
          ? Number(object.unreadmessages)
          : messages!.filter((m) => m.status !== "seen" && m.userid !== id)
              .length;
      return {
        content: object.content,
        date: new Date(object.date),
        isMe: object.userid === id,
        status: object.status,
        unreadMessages,
      };
    },
    [id],
  );
  const lastMessage = useMemo<{
    content: string;
    date: Date;
    isMe: boolean;
    status: "sent" | "delivered" | "seen";
    unreadMessages: number;
  }>(() => {
    if (!messagesSocket.length && chat.lastMessages)
      return handlerMessage({ object: chat.lastMessages });

    const lastSocketMsg = messagesSocket[messagesSocket.length - 1];
    return handlerMessage({ object: lastSocketMsg, messages: messagesSocket });
  }, [messagesSocket, chat.lastMessages, handlerMessage]);
  return { lastMessage };
};
export default useLastMessageSource;
