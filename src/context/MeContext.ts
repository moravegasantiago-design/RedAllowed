import { createContext } from "react";
import type { userProps } from "../Auth/hook/useFromUser";

const MeContext = createContext<{
  data: userProps | null;
  isLogin: boolean;
  loading: boolean;
  fetchMe: () => Promise<void>;
} | null>(null);
export default MeContext;
