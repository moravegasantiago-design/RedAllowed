import type { ReactNode } from "react";
import useMe from "../Auth/hook/useMe";
import MeContext from "../context/MeContext";

const MeProvider = ({ children }: { children: ReactNode }) => {
  const { me, isLogin } = useMe();
  const data = me && isLogin ? { data: me, isLogin: isLogin } : null;
  return <MeContext.Provider value={data}>{children}</MeContext.Provider>;
};
export default MeProvider;
