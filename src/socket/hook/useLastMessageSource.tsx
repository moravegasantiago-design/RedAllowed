import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type { chatProps } from "../../components/home/Home";
import type { messagesProps } from "./useMessages";
import type { lastMessagesProps } from "./useLastMessages";
import { SocketContext } from "../../context/SocketContext";

type refLastMessages = {
  content: string;
  date: Date;
  isMe: boolean;
  status: "sent" | "delivered" | "seen";
  unReadMessages: number;
  isBd: boolean;
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
  const socketRef = useContext(SocketContext);
  const unReadMessages = useRef<number>(0);
  const lastMessages = useRef<Map<string, refLastMessages>>(new Map());
  const [lastMessage, setLastMessage] = useState<refLastMessages | null>(null);
  const handleObject = useCallback(
    ({
      object,
      isBd,
    }: {
      object: lastMessagesProps | messagesProps;
      isBd: boolean;
    }): refLastMessages => {
      const myUnRead =
        object.status !== "seen" && !("unReadMessages" in object) ? 1 : 0;
      return {
        content: object.content,
        date: new Date(object.date),
        isMe: Number(object.userId) === id,
        status: object.status,
        isBd: isBd,
        unReadMessages:
          "unReadMessages" in object
            ? Number(object.unReadMessages)
            : unReadMessages.current +
              Array.from(lastMessages?.current.values()).filter(
                (m) => m.status !== "seen" && !m.isMe && !m.isBd,
              ).length +
              myUnRead,
      };
    },
    [id],
  );
  useEffect(() => {
    if (!socketRef?.current) return;
    if (
      !messagesSocket.length &&
      chat.lastMessages &&
      lastMessages.current.size === 0
    ) {
      unReadMessages.current = Number(chat.lastMessages.unReadMessages);
      lastMessages.current.set(
        chat.lastMessages.id,
        handleObject({ object: chat.lastMessages, isBd: true }),
      );
    }
    const current = socketRef?.current;
    const onSeen = (obj: { idMsg: string; chatId: number }) => {
      if (obj.chatId !== chat.chat_id) return;
      unReadMessages.current = 0;
      lastMessages.current.forEach((values, key) =>
        lastMessages.current.set(key, {
          ...values,
          status: values.status === "delivered" ? "seen" : values.status,
          unReadMessages: 0,
        }),
      );
      setLastMessage(
        Array.from(lastMessages.current.values()).sort(
          (a, b) => b.date.getTime() - a.date.getTime(),
        )[0],
      );
    };

    current.on("seen", onSeen);

    messagesSocket.forEach((m) => {
      lastMessages.current.set(m.id, handleObject({ object: m, isBd: false }));
    });

    setLastMessage(
      Array.from(lastMessages.current.values()).sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      )[0],
    );

    return () => {
      current.off("seen", onSeen);
      setLastMessage(null);
    };
  }, [messagesSocket, chat, handleObject, id, socketRef]);

  return { lastMessage };
};
export default useLastMessageSource;
