import { createContext } from "react";
import type { userOnlineProps } from "../socket/hook/useOnlineUsers";

const UsersOnlineContext = createContext<{
  usersOnline: userOnlineProps[];
  handlerUsers: (users: userOnlineProps[]) => void;
} | null>(null);

export default UsersOnlineContext;
