import { bringUsers } from "../db/user";
import { Response, Request } from "express";
export const requestUser = async (req: Request, res: Response) => {
  try {
    const users = await bringUsers();
    if (!users)
      return res
        .status(401)
        .json({ success: false, error: "Error en la base de datos" });
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};
