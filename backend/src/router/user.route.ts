import { Router } from "express";
import { requestProfile, requestUser } from "../controllers/user.controllers";

const router = Router();

router.post("/users", requestUser);
router.post("/profile", requestProfile);
export default router;
