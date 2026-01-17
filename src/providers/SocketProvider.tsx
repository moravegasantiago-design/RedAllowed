import { useEffect, useRef, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { SocketContext } from "../context/SocketContext";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("http://192.168.101.15:4000", {
      withCredentials: true,
      auth: {
        userId: "id",
      },
    });
    return () => {
      socket.current?.disconnect();
      socket.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
