import { useMemo, type ReactNode } from "react";
import useMe from "../Auth/hook/useMe";
import MeContext from "../context/MeContext";

const MeProvider = ({ children }: { children: ReactNode }) => {
  const { me, isLogin, loading, fetchMe } = useMe();
  const data = useMemo(() => {
    if (loading)
      return { data: null, isLogin: false, loading: true, fetchMe: fetchMe };
    if (!isLogin)
      return { data: null, isLogin: false, loading: loading, fetchMe: fetchMe };
    if (me)
      return { data: me, isLogin: isLogin, loading: loading, fetchMe: fetchMe };
    return null;
  }, [me, isLogin, loading, fetchMe]);
  return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
};
export default MeProvider;
