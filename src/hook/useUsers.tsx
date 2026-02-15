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
  iFollow: boolean;
  followMe: boolean;
  amount?: "ALL" | "ONE";
};
const useUsers = ({
  userId,
  amount,
}: {
  userId?: number;
  amount?: "ALL" | "ONE";
}) => {
  const { handleRequest, data, loading } = useFetch<usersType[]>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/user/users",
        method: "POST",
        isCredentials: true,
        user: { amount: amount, id: userId },
      });
    })();
  }, [handleRequest, amount, userId]);
  const users: usersType[] = data?.data ?? [];
  return { users, loading };
};
export default useUsers;
