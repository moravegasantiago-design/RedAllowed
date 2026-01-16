import { useCallback, useEffect, useState } from "react";

const useVisibility = () => {
  const [isVisibility, setIsVisibility] = useState<boolean>(true);
  const handleVisibilityChange = useCallback(() => {
    setIsVisibility(document.visibilityState === "visible");
  }, []);
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);
  return { isVisibility };
};
export default useVisibility;
