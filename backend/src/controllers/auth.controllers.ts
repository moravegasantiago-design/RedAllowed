import { Request, Response } from "express";
import { loginBd, registerBd } from "../db/auth";
import { comparePassword } from "./encryptPassword";
import { convertToken, createToken } from "./tokenAuth";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;
    const isRegister = await registerBd({
      name: name,
      username: username,
      email: email,
      password: password,
    });
    res.status(isRegister ? 201 : 401).json({ success: isRegister });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userCredentials = await loginBd({ email: email });
    if (!userCredentials || !userCredentials.password)
      return res.json({ success: false, error: "Cuenta no encontrada" });
    const isPassword = await comparePassword({
      encryptPassword: userCredentials.password,
      password: password,
    });
    if (!isPassword)
      return res
        .status(401)
        .json({ success: false, error: "Contraseña incorrecta" });
    const { name, username, created_at } = userCredentials;
    const token = createToken({ name, username, email, created_at });
    res
      .cookie("authToken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 48 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ success: true, data: { name, username, email, created_at } });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: error });
  }
};

export const verifyMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const isLogin = convertToken(token);
    if (!isLogin)
      return res
        .status(401)
        .json({ success: false, error: "No tienes acceso" });
    res.status(201).json({ success: true, data: isLogin });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: error });
  }
};
