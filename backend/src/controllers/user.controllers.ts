import { bringProfile, bringUsers } from "../db/user";
import { Response, Request } from "express";
export const requestUser = async (req: Request, res: Response) => {
  const { id, amount } = req.body;
  try {
    const users = await bringUsers(id, amount);
    if ("error" in users && users.error)
      return res.status(401).json({ success: false, error: users.throw });
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};

export const requestProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const profile = await bringProfile({ id });
    if (!profile)
      return res
        .status(404)
        .json({ success: false, error: "Error en consulta de bd" });
    res.status(200).json({ success: true, data: profile });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};
