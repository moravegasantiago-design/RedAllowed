import { bringUsers } from "../db/user";
import { Response, Request } from "express";
export const requestUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const users = await bringUsers(id);
    if ("error" in users && users.error)
      return res.status(401).json({ success: false, error: users.throw });
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};
