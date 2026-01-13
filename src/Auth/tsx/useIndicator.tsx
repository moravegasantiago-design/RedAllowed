import { useState, type ReactNode } from "react";
import { isSecurity } from "../ts/isPassSecurity";

export const useIndicator = () => {
  const [indicator, setIndicator] = useState<{
    colorInput: string;
    indicator: ReactNode[];
    title: string;
  } | null>(null);
  const updateIndicator = (passwordText: string): boolean => {
    const security = isSecurity(passwordText);
    let listIndicator: ReactNode[] = [];
    for (let i = 0; i <= 3; i++) {
      listIndicator = [
        ...listIndicator,
        <div
          key={i}
          className={`h-1 flex-1 ${
            i <= security.level ? security.color : "bg-zinc-700"
          } rounded-full`}
        ></div>,
      ];
      setIndicator({
        colorInput: security.color,
        indicator: [...listIndicator],
        title: security.title,
      });
    }
    return security.level === 3;
  };
  return { indicator, updateIndicator };
};
