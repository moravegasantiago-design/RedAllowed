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
  friends: string;
  followers: string;
  ifollow: boolean;
  followme: boolean;
};
const useUsers = (id?: number) => {
  const { handleRequest, data, loading } = useFetch<usersType[]>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/user/users",
        method: "POST",
        isCredentials: false,
        user: { id: id },
      });
    })();
  }, [handleRequest, id]);
  const users: usersType[] = data?.data ?? [];
  return { users, loading };
};
export default useUsers;
