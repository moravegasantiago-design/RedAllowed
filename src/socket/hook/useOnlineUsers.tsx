import { useCallback, useState } from "react";
export type userOnlineProps = { userId: number; socketId: number };
const useOnlineUser = () => {
  const [usersOnline, setUserOnline] = useState<userOnlineProps[]>([]);

  const handlerUsers = useCallback(
    (users: userOnlineProps[]) => setUserOnline([...users]),
    []
  );

  return { usersOnline, handlerUsers };
};

export default useOnlineUser;
