import { Router } from "express";
import { followHandler } from "../controllers/follow.controllers";

const router = Router();

router.post("/follow", followHandler);

export default router;
