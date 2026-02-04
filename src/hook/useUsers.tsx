import { useEffect } from "react";
import { useFetch } from "./useFetch";
export type usersType = {
  id: number;
  username: string;
  name: string;
  photo: string;
  bio: string;
  job: string;
  birtday: string;
  friends: number[];
  followers: number[];
};
const useUsers = () => {
  const { handleRequest, data } = useFetch<usersType[]>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/user/users",
        method: "GET",
        isCredentials: false,
      });
    })();
  }, [handleRequest]);
  const users: usersType[] = data?.data ?? [];
  return { users };
};
export default useUsers;
