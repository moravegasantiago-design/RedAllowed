import { Router } from "express";
import {
  requestProfile,
  requestUpdate,
  requestUser,
} from "../controllers/user.controllers";

const router = Router();

router.post("/users", requestUser);
router.post("/profile", requestProfile);
router.post("/profile/update", requestUpdate);
export default router;
