import { useMemo } from "react";
import type { messagesProps } from "./useMessages";

const useMergedMessages = ({
  messages,
  messagesSocket,
}: {
  messages: messagesProps[];
  messagesSocket: messagesProps[];
}) => {
  const mergedMessages = useMemo(() => {
    const newChat = new Map();
    [...messages, ...messagesSocket].forEach((c) => newChat.set(c.id, c));
    const chat: messagesProps[] = Array.from(newChat.values());
    return chat.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [messages, messagesSocket]);

  return { mergedMessages };
};

export default useMergedMessages;
