import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import MeContext from "../../context/MeContext";
import SocketProvider from "../../providers/SocketProvider";
import UsersOnlineProvider from "../../providers/UsersOnlineProvider";
import ChatsProvider from "../../providers/ChatsProvider";

export const RouterProtection = () => {
  const navigate = useNavigate();
  const dataMe = useContext(MeContext) ?? null;
  const { state } = useLocation();
  const isLogin = useRef(false);
  useEffect(() => {
    (async () => {
      if (!isLogin?.current) {
        await dataMe?.fetchMe();
        isLogin.current = true;
        return;
      }
      if (dataMe?.data) {
        navigate(location.pathname, { replace: true });
        return;
      }
      navigate("/login");
    })();
  }, [dataMe, navigate, state]);
  return (
    <ChatsProvider>
      <UsersOnlineProvider>
        <SocketProvider>
          <Outlet />
        </SocketProvider>
      </UsersOnlineProvider>
    </ChatsProvider>
  );
};

// error no esta comprobando el tocken no devuelve nada
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
