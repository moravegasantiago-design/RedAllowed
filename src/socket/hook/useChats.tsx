import { useContext, useEffect } from "react";
import MeContext from "../../context/MeContext";
import { useFetch } from "../../hook/useFetch";
import type { ChatsProps } from "../../context/ChatsContext";

const useChats = () => {
  const id = useContext(MeContext);
  const { handleRequest, data } = useFetch<ChatsProps[]>();
  useEffect(() => {
    (async () => {
      if (!id?.data?.id) return;
      try {
        await handleRequest({
          href: "api/chat/chats",
          method: "GET",
          isCredentials: false,
          user: { id: id.data.id },
        });
      } catch (e) {
        console.error(e);
        return;
      }
    })();
  }, [handleRequest, id?.data?.id]);
  const chats: ChatsProps[] = data?.data ?? [];
  return { chats };
};

export default useChats;
