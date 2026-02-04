import { Request, Response } from "express";
import { follow, stopFollowing } from "../db/follow";

export const followHandler = async (req: Request, res: Response) => {
  const { idP1, idP2 } = req.body;
  try {
    const isFollowed = await follow({ idP1, idP2 });
    if (isFollowed === null)
      return res
        .status(404)
        .json({ success: false, error: "follow : Error en peticion a bd" });
    if (isFollowed) {
      await stopFollowing({ idP1, idP2 });
      return res
        .status(200)
        .json({
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
