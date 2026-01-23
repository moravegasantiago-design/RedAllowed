import { useContext, useEffect, useState, type RefObject } from "react";
import type { Socket } from "socket.io-client";
import type { messagesProps } from "./useMessages";
import MeContext from "../../context/MeContext";

const useSocketMessages = (socketRef: RefObject<Socket | null> | null) => {
  const [messagesSocket, setMessages] = useState<messagesProps[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const credendials = useContext(MeContext);
  const handleStatusMessages = (status: "delivered" | "seen", idMsg: string) =>
    setMessages((prev) =>
      prev.map((p) => (p.id === idMsg ? { ...p, status: status } : p))
    );

  const handleSocketMessages = (data: messagesProps, current: Socket) => {
    setMessages((prev) =>
      prev.find((p) => p.id === data.id)
        ? prev
        : [
            ...prev,
            {
              content: data.content,
              date: data.date,
              userId: data.userId,
              status:
                data.userId === credendials?.data.id ? "sent" : "delivered",
              id: data.id,
            },
          ]
    );
    if (data.userId === credendials?.data.id) return;
    current?.emit("delivered", data.id, "id");
  };
  useEffect(() => {
    if (!socketRef?.current) return;
    const current = socketRef?.current;
    const onMessages = (data: messagesProps) =>
      handleSocketMessages(data, current);
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
  return { messagesSocket, isWriting };
};
export default useSocketMessages;
