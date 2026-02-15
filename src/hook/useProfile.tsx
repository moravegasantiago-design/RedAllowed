import { useEffect } from "react";
import { useFetch } from "./useFetch";
export type profileProps = {
  name: string;
  username: string;
  bio: string | null;
  birthDay: string | null;
  job: string | null;
  imagen: string;
  friends: string;
  followers: string;
  messages: string;
};
const useProfile = () => {
  const { handleRequest, data, loading } = useFetch<profileProps>();
  useEffect(() => {
    (async () => {
      await handleRequest({
        href: "api/user/profile",
        isCredentials: true,
        method: "GET",
      });
    })();
  }, [handleRequest]);
  return { data, loading };
};

export default useProfile;
