import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";
import LoadingSocket from "../components/lodding/LoddingSocket";
import UsersOnlineContext from "../context/UsersOnlineContext";
import MeContext from "../context/MeContext";
import ChatsContext from "../context/ChatsContext";

const SOCKET_URL = "https://redallowed.onrender.com";

const SOCKET_CONFIG = {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  withCredentials: true,
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const chats = useContext(ChatsContext);
  const { handlerUsers } = useContext(UsersOnlineContext)!;
  const credentials = useContext(MeContext);

  useEffect(() => {
    if (!credentials?.data?.id) return;
    if (socketRef.current?.connected) return;

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io(SOCKET_URL, {
      ...SOCKET_CONFIG,
      auth: { userId: credentials?.data?.id },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("online_users");
      if (chats.length)
        chats.forEach((c) =>
          socket.emit("delivered", { chat_id: Number(c.chat_id) }),
        );
    });
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("online_users", handlerUsers);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("online_users");
    };
  }, [credentials?.data?.id, handlerUsers, chats]);

  useEffect(
    () => () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    },
    [],
  );
  if (!isConnected) return <LoadingSocket />;

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;