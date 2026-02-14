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
const useProfile = ({ id }: { id?: number }) => {
  const { handleRequest, data, loading } = useFetch<profileProps>();
  useEffect(() => {
    (async () => {
      if (!id) return;
      await handleRequest({
        href: "api/user/profile",
        isCredentials: false,
        method: "POST",
        user: { id: id },
      });
    })();
  }, [handleRequest, id]);
  return { data, loading };
};

export default useProfile;
