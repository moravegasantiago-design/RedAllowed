import { useEffect, useRef, useState } from "react";

const useClickMenu = () => {
  const divRef = useRef<HTMLDivElement[]>([]);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  useEffect(() => {
    const handlerClick = (e: PointerEvent) => {
      const target = e.target as Node;
      if (divRef.current?.some((d) => d.contains(target))) return;
      setOpenMenu(false);
    };
    document.addEventListener("click", handlerClick);
    return () => document.removeEventListener("click", handlerClick);
  }, []);
  return { divRef, openMenu, setOpenMenu };
};

export default useClickMenu;
