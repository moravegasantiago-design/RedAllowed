import { useMemo, type ReactNode } from "react";
import useMe from "../Auth/hook/useMe";
import MeContext from "../context/MeContext";

const MeProvider = ({ children }: { children: ReactNode }) => {
  const { me, isLogin, loading } = useMe();
  const data = useMemo(() => {
    if (loading) return { data: null, isLogin: false, loading: true };
    if (!isLogin) return { data: null, isLogin: false, loading: loading };
    if (me) return { data: me, isLogin: isLogin, loading: loading };
    return null;
  }, [me, isLogin, loading]);
  return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
};
export default MeProvider;
