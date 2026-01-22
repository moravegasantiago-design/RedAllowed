import { useEffect } from "react";
import { useFetch } from "./useFetch";
export type usersType = {
  id: number;
  type: "login" | "register";
  username: string;
  name: string;
  photo: string;
  bio: string;
  job: string;
  birtday: string;
  friends: number;
  followers: number;
};
const useUsers = () => {
  const { handleRequest, data } = useFetch<usersType[]>();
  const users: usersType[] = data?.data ?? [];
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/user/users",
        method: "GET",
        isCredentials: false,
      });
    })();
  }, [handleRequest]);
  return { users };
};
export default useUsers;
