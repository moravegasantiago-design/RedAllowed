import { useState } from "react";
import { useLocation } from "react-router-dom";
const useRouteState = <T extends object>() => {
  const [stateInf, setState] = useState<T | null>(null);
  const { state } = useLocation();
  if (state && JSON.stringify(stateInf) !== JSON.stringify(state))
    setState(state);
  return { stateInf };
};
export default useRouteState;
