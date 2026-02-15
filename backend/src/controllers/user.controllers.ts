import { bringProfile, bringUsers, updateProfile } from "../db/user";
import { Response, Request } from "express";
import requireAuth from "../middlewares/requireAuth";
export const requestUser = async (req: Request, res: Response) => {
  const { amount, id } = req.body;
  const token = req.cookies.authToken;
  const credentials = requireAuth({ token, res });
  if (!credentials) return;
  try {
    const users = await bringUsers(
      amount === "ONE" ? id : credentials.id,
      amount,
    );
    if ("error" in users && users.error)
      return res.status(401).json({ success: false, error: users.throw });
    res.status(200).json({ success: true, data: users });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};

export const requestProfile = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  const credentials = requireAuth({ token, res });
  if (!credentials) return;
  try {
    const profile = await bringProfile({ id: credentials.id });
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

export const requestUpdate = async (req: Request, res: Response) => {
  const { table, field, value } = req.body;
  const token = req.cookies.authToken;
  const credentials = requireAuth({ token, res });
  if (!credentials) return;
  try {
    if (
      !["users", "user_profiles"].includes(table) ||
      !["name", "username", "bio", "photo", "birthday", "job_title"].includes(
        (field as string).toLowerCase(),
      )
    )
      return res
        .status(403)
        .json({ success: false, error: "Tabla o campo no autorizado" });

    const isUpdate = await updateProfile({
      id: credentials.id,
      table,
      field,
      value,
    });
    if (!isUpdate)
      return res
        .status(404)
        .json({ success: false, error: "Error en la consulta a la bd" });

    res.status(200).json({ success: true, data: null });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e });
  }
};
