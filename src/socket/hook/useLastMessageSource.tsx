import { useCallback, useEffect, useRef, useState } from "react";
import type { chatProps } from "../../components/home/Home";
import type { messagesProps } from "./useMessages";
import type { lastMessagesProps } from "./useLastMessages";

type refLastMessages = {
  content: string;
  date: Date;
  isMe: boolean;
  status: "sent" | "delivered" | "seen";
  unReadMessages: number;
};
const useLastMessageSource = ({
  messagesSocket,
  chat,
  id,
}: {
  messagesSocket: messagesProps[];
  chat: chatProps;
  id?: number;
}) => {
  const unReadMessages = useRef<number>(0);
  const lastMessages = useRef<Map<string, refLastMessages>>(new Map());
  const [lastMessage, setLastMessage] = useState<refLastMessages | null>(null);
  const handleObject = useCallback(
    ({
      object,
    }: {
      object: lastMessagesProps | messagesProps;
    }): refLastMessages => {
      console.log(object);
      console.log(id);
      return {
        content: object.content,
        date: new Date(object.date),
        isMe: Number(object.userId) === id,
        status: object.status,
        unReadMessages:
          "unreadmessages" in object
            ? Number(object.unreadmessages)
            : unReadMessages.current +
              Array.from(lastMessages?.current.values()).length,
      };
    },
    [id],
  );
  useEffect(() => {
    if (!messagesSocket.length && chat.lastMessages) {
      unReadMessages.current = Number(chat.lastMessages.unReadMessages);
      lastMessages.current.set(
        chat.lastMessages.id,
        handleObject({ object: chat.lastMessages }),
      );
    } else
      messagesSocket.forEach((m) => {
        if (m.status === "seen") return lastMessages.current.delete(m.id);
        lastMessages.current.set(m.id, handleObject({ object: m }));
      });
    setLastMessage(
      Array.from(lastMessages.current.values()).sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      )[0],
    );
  }, [messagesSocket, chat, handleObject, id]);

  return { lastMessage };
};
export default useLastMessageSource;
