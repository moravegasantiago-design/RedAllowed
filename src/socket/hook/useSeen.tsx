import { useEffect, useRef, type RefObject } from "react";
import useVisibility from "./useVisibility";
import { Socket } from "socket.io-client";
const useSeen = (socket: RefObject<Socket | null> | null) => {
  const isSeen = useRef<IntersectionObserver | null>(null);
  const { isVisibility } = useVisibility();
  useEffect(() => {
    if (!isVisibility || !socket?.current) return;
    isSeen.current = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        if (!entrie.isIntersecting || !socket.current) return;
        socket.current.emit("seen", entrie.target.id, "id");
      });
    });
    return () => isSeen.current?.disconnect();
  }, [isVisibility, socket]);

  return { isSeen };
};

export default useSeen;
