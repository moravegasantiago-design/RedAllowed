import { useState } from "react";

export const useComparePassword = () => {
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const comparePassword = (props: { pass: string; confirmPass: string }) => {
    const { pass, confirmPass } = props;
    if (pass === confirmPass) {
      setIsPassword(false);
      return false;
    }
    setIsPassword(true);
    return true;
  };
  return { isPassword, comparePassword };
};
