import { useEffect } from "react";
import { useFetch } from "../../hook/useFetch";

const useMe = () => {
  const { handleRequest, data, loading } = useFetch();
  useEffect(() => {
    (async () => {
      try {
        await handleRequest({
          method: "GET",
          isCredentials: true,
          href: "api/auth/me",
        });
      } catch (e) {
        console.error(e);
        return;
      }
    })();
  }, [handleRequest]);
  const me = data?.data ?? null;
  const isLogin = Boolean(data?.data);
  return { me, isLogin, loading };
};

export default useMe;
