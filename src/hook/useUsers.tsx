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
  friends: number;
  followers: number;
  iFollow: boolean;
  followMe: boolean;
};
const useUsers = (id?: number) => {
  const { handleRequest, data } = useFetch<usersType[]>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/user/users",
        method: "GET",
        isCredentials: false,
        user: { id: id },
      });
    })();
  }, [handleRequest, id]);
  const users: usersType[] = data?.data ?? [];
  return { users };
};
export default useUsers;
