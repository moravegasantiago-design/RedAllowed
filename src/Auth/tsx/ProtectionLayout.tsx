import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import MeContext from "../../context/MeContext";

export const RouterProtection = () => {
  const navigate = useNavigate();
  const data = useContext(MeContext) ?? null;
  useEffect(() => {
    if (data?.isLogin ?? true) return;
    navigate("/login");
  }, [data?.isLogin, navigate]);
  return <Outlet />;
};

/*In production it should be like this,
but since I don't have it connected for now, 
I can't activate it because of the renderer.*/
/*
export const RouterProtection = () => {
  const navigate = useNavigate();
  const data = useContext(MeContext);
  useEffect(() => {
    if (data?.isLogin) return;
    navigate("/login");
  }, [data?.isLogin, navigate]);
  return <Outlet />;
};

*/