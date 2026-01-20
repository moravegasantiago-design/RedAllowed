import { useEffect, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";
import LoadingSocket from "../components/lodding/LoddingSocket";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const [isSocket, setIsSocket] = useState<boolean>(false);
  useEffect(() => {
    socket.current = io("https://redallowed.onrender.com", {
      withCredentials: true,
      auth: {
        userId: "id",
      },
    });
    socket.current.on("connect", () => setIsSocket(true));
    return () => {
      socket.current?.disconnect();
      socket.current = null;
    };
  }, []);
  if (!isSocket) return <LoadingSocket />;
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
