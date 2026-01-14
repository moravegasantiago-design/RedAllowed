import { Outlet, useNavigate } from "react-router-dom";
import { useFetchAuth } from "./useFetchAuth";
import { useEffect, useState } from "react";

export const RouterProtection = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { handleRequest } = useFetchAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const req = await handleRequest({
        method: "GET",
        isCredentials: true,
        href: "me",
      });
      if (!req) setIsLogin(true);
    })();
  }, [handleRequest, navigate]);

  useEffect(() => {
    if (!isLogin) return;
    navigate("/login");
  }, [isLogin, navigate]);
  return <Outlet />;
};
