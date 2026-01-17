import { createContext, type RefObject } from "react";
import type { Socket } from "socket.io-client";

export const SocketContext = createContext<RefObject<Socket | null> | null>(
  null
);
