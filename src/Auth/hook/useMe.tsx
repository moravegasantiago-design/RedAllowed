import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../socket/hook/useFetch";

const useMe = () => {
  const navigate = useNavigate();
  const { handleRequest, data } = useFetch();
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
  return { me, isLogin, navigate };
};

export default useMe;
