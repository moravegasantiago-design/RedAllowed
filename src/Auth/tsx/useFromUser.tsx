import { useState, type ChangeEvent } from "react";

export type userProps = {
  type?: "login" | "register";
  name?: nameKeys | "";
  username?: string;
  email?: string;
  password: string;
  conditions?: boolean;
  passwordConfirm?: string;
};
type nameKeys = keyof userProps;
export const useFormUser = () => {
  const [formUser, setFormUser] = useState<userProps>({
    name: "",
    username: "",
    email: "",
    password: "",
    conditions: false,
    passwordConfirm: "",
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type, checked } = event.target;
    setFormUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return { formUser, handleChange };
};

export default useFormUser;
