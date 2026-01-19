import { Request, Response } from "express";
import { bringChats } from "../db/chat";

export const requestChat = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const chats = await bringChats(id);
    if (!chats)
      res
        .status(500)
        .json({ success: false, error: "Error en peticion a base de datos" });
    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error });
  }
};
