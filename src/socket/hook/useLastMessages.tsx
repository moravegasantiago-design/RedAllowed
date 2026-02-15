import { useEffect } from "react";
import { useFetch } from "../../hook/useFetch";
export type lastMessagesProps = {
  chatId: number;
  id: string;
  userId: number;
  content: string;
  status: "sent" | "delivered" | "seen";
  date: string;
  unReadMessages: string;
};
const useLastMessages = () => {
  const { data, handleRequest } = useFetch<lastMessagesProps[]>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/chat/lastMessages",
        method: "GET",
        isCredentials: true,
      });
    })();
  }, [handleRequest]);
  const lastMessages: lastMessagesProps[] = data?.data ?? [];
  return { lastMessages };
};

export default useLastMessages;
