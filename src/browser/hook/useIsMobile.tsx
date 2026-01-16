import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { isMobile };
};
export default useIsMobile;
