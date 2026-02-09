import { useState } from "react";
import { useLocation } from "react-router-dom";
const useRouteState = <T extends object>() => {
  const [stateInf, setState] = useState<T | null>(null);
  const { state } = useLocation();
  if (state && !stateInf) setState(state);
  return { stateInf };
};
export default useRouteState;
