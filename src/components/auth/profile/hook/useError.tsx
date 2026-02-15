import { useState } from "react";

const useError = () => {
  const [isError, setIsError] = useState<string | null>(null);

  const removeError = () => setIsError(null);

  const handleError = ({
    text,
    type,
    values,
  }: {
    text: { text: string; textUpdate: string | null };
    type: "date" | "text";
    values: string | null;
  }) => {
    const date =
      new Date().getFullYear() - new Date(text.text).getFullYear() >= 14;
    const textError = () => {
      if (
        text.textUpdate === text.text ||
        (!text.textUpdate && values === text.text)
      )
        return {
          error: false,
          alertText: "No puede ser igual al valor anterior",
        };
      return {
        error:
          text.text
            .trim()
            .split("")
            .filter((p) => p).length >= 6,
        alertText: "Minimo 6 caracteres requeridos",
      };
    };
    const inputType = {
      date: { error: date, alertText: "Mayor de 14 años" },
      text: textError(),
    };
    if (!inputType[type].error) setIsError(inputType[type].alertText);
    return inputType[type].error;
  };

  return { handleError, isError, removeError };
};

export default useError;
