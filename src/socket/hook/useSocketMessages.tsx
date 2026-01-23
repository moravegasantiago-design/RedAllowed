import { useEffect, useState, type RefObject } from "react";
import type { Socket } from "socket.io-client";
type Messages = {
  text: string;
  date: string;
  user: string;
  isMe: boolean;
  status: "sent" | "delivered" | "seen";
  idMessage: string;
};

const useSocketMessages = (socketRef: RefObject<Socket | null> | null) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const handleStatusMessages = (status: "delivered" | "seen", idMsg: string) =>
    setMessages((prev) =>
      prev.map((p) => (p.idMessage === idMsg ? { ...p, status: status } : p))
    );

  const handleSocketMessages = (data: Messages, current: Socket) => {
    setMessages((prev) =>
      prev.find((p) => p.idMessage === data.idMessage)
        ? prev
        : [
            ...prev,
            {
              text: data.text,
              date: data.date,
              user: data.user,
              isMe: data.user === current?.id,
              status: data.user === current?.id ? "sent" : "delivered",
              idMessage: data.idMessage,
            },
          ]
    );
    if (data.user === current?.id) return;
    current?.emit("delivered", data.idMessage, "id");
  };
  useEffect(() => {
    if (!socketRef?.current) return;
    const current = socketRef?.current;
    const onMessages = (data: Messages) => handleSocketMessages(data, current);
    const onTyping = (isTrue: boolean) => setIsWriting(isTrue);
    const onDelivered = (id: string) => handleStatusMessages("delivered", id);
    const onSeen = (idMsg: string) => handleStatusMessages("seen", idMsg);
    current.emit("join_chat", "id");
    current.on("message", onMessages);
    current.on("typing", onTyping);
    current.on("delivered", onDelivered);
    current.on("seen", onSeen);

    return () => {
      current.off("message", onMessages);
      current.off("typing", onTyping);
      current.off("delivered", onDelivered);
      current.off("seen", onSeen);
    };
  }, [socketRef]);
  return { messages, isWriting };
};
export default useSocketMessages;
