import { useEffect } from "react";
import { useFetch } from "../../hook/useFetch";

export type messagesProps = {
  id: string;
  userId: number;
  chatId?: number;
  content: string;
  date: string;
  status: "sent" | "delivered" | "seen";
};
const useMessages = (chatId: number) => {
  const { handleRequest, data } = useFetch<messagesProps[]>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/chat/messages",
        method: "POST",
        isCredentials: false,
        user: { chatId: chatId },
      });
    })();
  }, [handleRequest, chatId]);
  const messages = data?.data ?? [];
  return { messages };
};

export default useMessages;
