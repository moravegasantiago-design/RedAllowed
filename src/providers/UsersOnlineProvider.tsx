import type { ReactNode } from "react";
import useOnlineUser from "../socket/hook/useOnlineUsers";
import UsersOnlineContext from "../context/UsersOnlineContext";

const UsersOnlineProvider = ({ children }: { children: ReactNode }) => {
  const { usersOnline, handlerUsers } = useOnlineUser();
  return (
    <UsersOnlineContext value={{ usersOnline, handlerUsers }}>
      {children}
    </UsersOnlineContext>
  );
};

export default UsersOnlineProvider;
