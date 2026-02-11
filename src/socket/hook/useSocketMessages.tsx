import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type RefObject,
} from "react";
import type { Socket } from "socket.io-client";
import type { messagesProps } from "./useMessages";
import MeContext from "../../context/MeContext";

const useSocketMessages = ({
  socketRef,
  chatId,
}: {
  socketRef: RefObject<Socket | null> | null;
  chatId?: number;
}) => {
  const [messagesSocket, setMessages] = useState<messagesProps[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const credendials = useContext(MeContext);
  const handleStatusMessages = (
    status: "delivered" | "seen",
    obj: { idMsg: string; chatId: number },
  ) => {
    if (obj.chatId !== obj.chatId) return;
    const searchStatus = status === "delivered" ? "sent" : "delivered";
    setMessages((prev) =>
      prev.map((p) =>
        p.id === obj.idMsg || p.status === searchStatus
          ? { ...p, status: status }
          : p,
      ),
    );
  };
  const handleSocketMessages = useCallback(
    (data: messagesProps, current: Socket) => {
      if (data?.chatId !== chatId) return;
      setMessages((prev) =>
        prev.find((p) => p.id === data.id)
          ? prev
          : [
              ...prev,
              {
                content: data?.content,
                date: data?.date,
                userId: data?.userId,
                status:
                  data.userId === credendials?.data?.id ? "sent" : "delivered",
                id: data?.id,
              },
            ],
      );
      if (data.userId === credendials?.data?.id) return;
      current?.emit("delivered", { idMsg: data.id, chat_id: Number(chatId) });
    },
    [credendials?.data?.id, chatId],
  );
  useEffect(() => {
    if (!socketRef?.current || !chatId) return;
    const current = socketRef?.current;
    const onMessages = (data: messagesProps) =>
      handleSocketMessages(data, current);
    const onTyping = (isTrue: boolean, chat_id: number) => {
      if (chat_id === chatId) setIsWriting(isTrue);
    };
    const onDelivered = (obj: { idMsg: string; chatId: number }) =>
      handleStatusMessages("delivered", obj);
    const onSeen = (obj: { idMsg: string; chatId: number }) =>
      handleStatusMessages("seen", obj);
    current.emit("join_chat", chatId);
    current.on("message", onMessages);
    current.on("typing", onTyping);
    current.on("delivered", onDelivered);
    current.on("seen", onSeen);

    return () => {
      setMessages([]);
      setIsWriting(false);
      current.off("message", onMessages);
      current.off("typing", onTyping);
      current.off("delivered", onDelivered);
      current.off("seen", onSeen);
    };
  }, [socketRef, handleSocketMessages, chatId]);
  return { messagesSocket, isWriting };
};
export default useSocketMessages;
