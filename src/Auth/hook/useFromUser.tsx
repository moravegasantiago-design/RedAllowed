import { useState, type ChangeEvent } from "react";

export type userProps = {
  id?: number;
  type?: "login" | "register";
  name?: nameKeys | "";
  username?: string;
  email?: string;
  password?: string;
  conditions?: boolean;
  passwordConfirm?: string;
  created_at?: string;
  photo?: string;
  bio?: string;
  job?: string;
  birtday?: string;
  friends?: number;
  followers?: number;
  chatId?: number;
  amount?: "ALL" | "ONE";
  table?: "users" | "user_profiles";
  field?: "name" | "username" | "job" | "birthDay" | "bio";
  value?: string;
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
    const removeSpace =
      name === "name"
        ? value
        : value
            .split("")
            .filter((p) => p !== " ")
            .join("");
    setFormUser((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name !== "password" && name !== "passwordConfirm"
          ? removeSpace.toLowerCase()
          : removeSpace,
    }));
  };
  return { formUser, handleChange };
};

export default useFormUser;
