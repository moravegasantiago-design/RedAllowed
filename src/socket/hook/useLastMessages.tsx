import { useEffect } from "react";
import { useFetch } from "../../hook/useFetch";
export type lastMessagesProps = {
  chatId: number;
  id: string;
  userid: number;
  content: string;
  status: "sent" | "delivered" | "seen";
  date: string;
  unreadmessages: string;
};
const useLastMessages = ({ userId }: { userId?: number }) => {
  const { data, handleRequest } = useFetch<lastMessagesProps[]>();
  useEffect(() => {
    if (!userId) return;
    (async () => {
      await handleRequest({
        href: "api/chat/lastMessages",
        method: "POST",
        isCredentials: false,
        user: { id: userId },
      });
    })();
  }, [handleRequest, userId]);
  const lastMessages: lastMessagesProps[] = data?.data ?? [];
  return { lastMessages };
};

export default useLastMessages;
