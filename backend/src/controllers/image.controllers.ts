import { Request, Response } from "express";
import { uploadCloudinary } from "../cloudinary/cloudinary";
import requireAuth from "../middlewares/requireAuth";
import { updateImage } from "../db/image";

export const requestImage = async ({
  res,
  req,
}: {
  res: Response;
  req: Request;
}) => {
  const file = req.file?.path;
  const token = req.cookies.authToken;
  const credentials = requireAuth({ token, res });
  if (!credentials) return;
  if (!file) res.status(404).json({ success: false, error: "No hay archivos" });
  try {
    const urlCloud = await uploadCloudinary(req);
    if (!urlCloud)
      return res
        .status(500)
        .json({ success: false, error: "Error en convercion de imagen" });
    const isUpdate = await updateImage(urlCloud, credentials.id);
    if (!isUpdate)
      return res
        .status(404)
        .json({ success: false, error: "Error en consulta a bd" });
    res.status(200).json({ success: true, data: { image: urlCloud } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};
