import { createContext } from "react";
import type { userProps } from "../Auth/hook/useFromUser";

const MeContext = createContext<{ data: userProps; isLogin: boolean } | null>(
  null
);
export default MeContext;
