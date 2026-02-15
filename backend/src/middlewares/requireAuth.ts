import { convertToken } from "../controllers/tokenAuth";
import { Response } from "express";
const requireAuth = ({ token, res }: { token: string; res: Response }) => {
  const credentials = convertToken(token);
  if (
    !credentials ||
    typeof credentials === "string" ||
    !("id" in credentials)
  ) {
    res.status(403).json({ success: false, error: "No tienes acceso" });
    return null;
  }
  return credentials;
};
export default requireAuth;
