import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../keysEnv";
import { userProps } from "../models/authProps";

export const createToken = (props: userProps) => {
  const { id, name, username, email, created_at } = props;
  return jwt.sign(
    {
      id: id,
      name: name,
      username: username,
      email: email,
      created_at: created_at,
    },
    JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

export const convertToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error(error);
    return null;
  }
};
