import { useState } from "react";
import type { userProps } from "./useFromUser";

export const UseValidation = () => {
  const [validation, setValidation] = useState<{
    isError: boolean;
    message: string;
  }>({ isError: false, message: "" });
  const handleState = (props: userProps) => {
    const { type } = props;
    if (type === "login") {
      const arrayLogin = Object.entries(props)
        .filter(
          (c) =>
            c[0] === "email" || c[0] === "password" || c[0] === "conditions"
        )
        .flatMap((a) => a[1]);
      const validateEmpty = arrayLogin.includes("");
      if (!validateEmpty) return false;
      setValidation((prev) => ({
        ...prev,
        isError: true,
        message: "",
      }));
      return true;
    }

    const arrayIsKey = Object.values(props);
    const validateEmpty = arrayIsKey.includes("");
    const validateConditions = arrayIsKey.includes(false);
    if (!validateEmpty && !validateConditions) return false;
    setValidation((prev) => ({
      ...prev,
      isError: true,
      message: validateEmpty
        ? "Faltan credenciales"
        : "Porfavor acepta terminos",
    }));
    return true;
  };

  return { handleState, validation };
};
