import { Router } from "express";
import { requestUser } from "../controllers/user.controllers";

const router = Router();

router.post("/users", requestUser);

export default router;
