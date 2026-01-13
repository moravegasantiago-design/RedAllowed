import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useFetchAuth } from "./useFetchAuth";
import { useCallback, useEffect, useState } from "react";

export const RouterProtection = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { data, handleRequest } = useFetchAuth();

  const memoHandleRequest = useCallback(
    async (props: { href: string; method: string; isCredentials: boolean }) => {
      await handleRequest(props);
    },
    [handleRequest]
  );

  useEffect(() => {
    (async () => {
      await memoHandleRequest({
        method: "GET",
        isCredentials: true,
        href: "me",
      });
      if (data?.success) setIsLogin(true);
    })();
  }, [memoHandleRequest, data, navigate]);

  if (!isLogin) return <Navigate to="/Login" />;
  return <Outlet />;
};
