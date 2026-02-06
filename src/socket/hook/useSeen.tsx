import { useEffect, useRef, type RefObject } from "react";
import useVisibility from "../../hook/useVisibility";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
const useSeen = (socket: RefObject<Socket | null> | null) => {
  const isSeen = useRef<IntersectionObserver | null>(null);
  const { isVisibility } = useVisibility();
  const { chatId } = useParams<{ chatId: string }>();
  useEffect(() => {
    if (!isVisibility || !socket?.current) return;
    isSeen.current = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        if (!entrie.isIntersecting || !socket.current) return;
        socket.current.emit("seen", entrie.target.id, Number(chatId));
      });
    });
    return () => isSeen.current?.disconnect();
  }, [isVisibility, socket, chatId]);

  return { isSeen };
};

export default useSeen;
