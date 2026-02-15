import { Request, Response } from "express";
import { follow, stopFollowing } from "../db/follow";
import requireAuth from "../middlewares/requireAuth";

export const followHandler = async (req: Request, res: Response) => {
  const { idP2 } = req.body;
  const token = req.cookies.authToken;
  const credentials = requireAuth({ token, res });
  if (!credentials) return;
  try {
    const isFollowed = await follow({ idP1: credentials.id, idP2 });
    if (isFollowed === null)
      return res
        .status(404)
        .json({ success: false, error: "follow : Error en peticion a bd" });
    if (isFollowed) {
      await stopFollowing({ idP1: credentials.id, idP2 });
      return res.status(200).json({
        success: true,
        data: { message: "Ha acabado el seguimiento" },
      });
    }
    res
      .status(201)
      .json({ success: true, data: { message: "Ha iniciado seguimiento" } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};
