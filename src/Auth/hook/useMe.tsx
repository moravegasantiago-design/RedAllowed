import { useEffect } from "react";
import { useFetchAuth } from "./useFetchAuth";
import { useNavigate } from "react-router-dom";

const useMe = () => {
  const navigate = useNavigate();
  const { handleRequest, data } = useFetchAuth();
  useEffect(() => {
    (async () => {
      try {
        await handleRequest({
          method: "GET",
          isCredentials: true,
          href: "me",
        });
      } catch (e) {
        console.error(e);
        return;
      }
    })();
  }, [handleRequest]);
  const me = data?.data ?? null;
  const isLogin = Boolean(data?.data);
  return { me, isLogin, navigate };
};

export default useMe;
