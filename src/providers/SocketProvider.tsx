import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";
import LoadingSocket from "../components/lodding/LoddingSocket";
import UsersOnlineContext from "../context/UsersOnlineContext";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const [isSocket, setIsSocket] = useState<boolean>(false);
  const { handlerUsers } = useContext(UsersOnlineContext)!;
  useEffect(() => {
    socket.current = io("https://redallowed.onrender.com", {
      withCredentials: true,
      auth: {
        userId: "id",
      },
    });
    socket.current.on("connect", () => setIsSocket(true));
    socket.current.on("online_users", handlerUsers);
    return () => {
      socket.current?.disconnect();
      socket.current?.off("online_users", handlerUsers);
      socket.current = null;
    };
  }, [handlerUsers]);
  if (!isSocket) return <LoadingSocket />;
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
