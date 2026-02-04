import { useCallback, useEffect } from "react";
import { useFetch } from "../../hook/useFetch";

const useMe = () => {
  const { handleRequest, data, loading } = useFetch();
  const fetchMe = useCallback(async () => {
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
  }, [handleRequest]);
  useEffect(() => {
    (async () => await fetchMe())();
  }, [fetchMe]);
  const me = data?.data ?? null;
  const isLogin = Boolean(data?.data);
  return { me, isLogin, loading, fetchMe };
};

export default useMe;
