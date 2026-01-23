import { Request, Response } from "express";
import { bringChats, bringMessage, createGroup } from "../db/chat";
export const requestChat = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const chats = await bringChats(id);
    if (!chats)
      return res
        .status(404)
        .json({ success: false, error: "Error en peticion a base de datos" });
    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error });
  }
};

export const newChat = async (req: Request, res: Response) => {
  const { idP1, idP2 } = req.body;
  try {
    const isCreateChat = await createGroup({ idP1, idP2 });
    if (!isCreateChat)
      return res
        .status(404)
        .json({ success: false, error: "Error en peticion a base de datos" });
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    return;
  }
};

export const requestMessage = async (req: Request, res: Response) => {
  const chatId = req.body;
  const messages = await bringMessage({ chatId: chatId });
  if (!messages)
    return res
      .status(401)
      .json({ success: false, error: "Error en consulta de base de datos" });
  res.status(200).json({ success: true, data: messages.reverse() });
};