import { Navigate, Outlet } from "react-router-dom";

export const RouterProtection = () => {
  const isLogin = false;
  if (!isLogin) return <Navigate to="/Login" />;
  return <Outlet />;
};
