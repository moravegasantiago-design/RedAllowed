import { useContext, useEffect } from "react";
import MeContext from "../../context/MeContext";
import { useFetch } from "./useFetch";

const useChats = () => {
  const id = useContext(MeContext);
  const { handleRequest, data, error } = useFetch();
  useEffect(() => {
    if (!data) return console.error(error?.error);
    (async () => {
      if (!id?.data.id) return;
      await handleRequest({
        href: "api/chat/chats",
        method: "GET",
        isCredentials: false,
        user: { id: id.data.id },
      });
    })();
  }, [handleRequest, id, error, data]);
  const chats = data?.data;
  return { chats };
};

export default useChats;
