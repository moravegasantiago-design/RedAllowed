import { useEffect, useState, type RefObject } from "react";
import type { Socket } from "socket.io-client";
type Message = {
  text: string;
  date: string;
  user: string;
  isMe: boolean;
  status: "sent" | "delivered" | "seen";
  idMessage: string;
};

const useChat = (socket: RefObject<Socket | null>) => {
  const [chat, setChat] = useState<Message[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const handleStatusMessage = (status: "delivered" | "seen", idMsg: string) => {
    setChat((prev) =>
      prev.map((p) => (p.idMessage === idMsg ? { ...p, status: status } : p))
    );
  };
  const handleChat = (data: Message, current: Socket) => {
    setChat((prev) =>
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
    current.emit("delivered", data.idMessage);
  };
  useEffect(() => {
    const current = socket.current;
    if (!current) return;
    const onChat = (data: Message) => handleChat(data, current);
    const onTyping = (isTrue: boolean) => setIsWriting(isTrue);
    const onDelivered = (id: string) => handleStatusMessage("delivered", id);
    const onSeen = (idMsg: string) => handleStatusMessage("seen", idMsg);

    current.on("message", onChat);
    current.on("typing", onTyping);
    current.on("delivered", onDelivered);
    current.on("seen", onSeen);

    return () => {
      current.off("mensaje", onChat);
      current.off("typing", onTyping);
      current.off("delivered", onDelivered);
      current.off("seen", onSeen);
    };
  }, [socket]);
  return { chat, isWriting };
};
export default useChat;
