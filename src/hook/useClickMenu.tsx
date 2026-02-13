import { useEffect, useRef, useState } from "react";

const useClickMenu = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  useEffect(() => {
    const handlerClick = (e: PointerEvent) => {
      const target = e.target as Node;
      if (divRef.current?.contains(target)) return;
      setOpenMenu(false);
    };
    document.addEventListener("click", handlerClick);
    return () => document.removeEventListener("click", handlerClick);
  }, []);
  return { divRef, openMenu, setOpenMenu };
};

export default useClickMenu;
