import { useEffect } from "react";
import type { ChatsProps } from "../../context/ChatsContext";
import { useFetch } from "../../hook/useFetch";

const useChats = () => {
  const { handleRequest, data } = useFetch<ChatsProps[]>();
  useEffect(() => {
    (async () => {
      try {
        await handleRequest({
          href: "api/chat/chats",
          method: "GET",
          isCredentials: true,
        });
      } catch (e) {
        console.error(e);
        return;
      }
    })();
  }, [handleRequest]);
  const chats: ChatsProps[] | null = data?.data ?? [];
  return { chats };
};

export default useChats;