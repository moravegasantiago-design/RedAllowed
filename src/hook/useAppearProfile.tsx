import { useEffect, useRef, useState } from "react";
import type { seenProfileProps } from "../components/home/Home";

const useAppearProfile = () => {
  const profileRef = useRef<HTMLDivElement[]>([]);
  const [seenProfile, setSeenProfile] = useState<seenProfileProps>({
    isSeen: false,
    positionX: null,
    positionY: null,
    id: null,
    chatId: null,
  });
  const handleClick = (
    e: React.MouseEvent<HTMLImageElement>,
    id: number,
    chatId?: number,
  ) => {
    setSeenProfile({
      isSeen: true,
      positionX: e.clientX,
      positionY: e.clientY,
      id: id,
      chatId: chatId ?? null,
    });
  };

  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      if (profileRef.current.some((p) => p.contains(e.target as Node))) return;
      setSeenProfile({
        isSeen: false,
        positionX: null,
        positionY: null,
        id: null,
        chatId: null,
      });
    };
    document.addEventListener("click", handleEvent);

    return () => document.removeEventListener("click", handleEvent);
  }, []);

  return { seenProfile, setSeenProfile, handleClick, profileRef };
};
export default useAppearProfile;
