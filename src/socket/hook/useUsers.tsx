import { useEffect } from "react";
import type { userProps } from "../../Auth/hook/useFromUser";
import { useFetch } from "./useFetch";

const useUsers = () => {
  const { handleRequest, data } = useFetch<userProps[]>();
  const users: userProps[] = data?.data ?? [];
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "/api/user/users",
        method: "GET",
        isCredentials: false,
      });
    })();
  }, [handleRequest]);
  return { users };
};
export default useUsers;
