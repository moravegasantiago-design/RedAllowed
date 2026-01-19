import { Router } from "express";
import { requestChat } from "../controllers/chats.controllers";
const router = Router();
router.get("/chats", requestChat);

export default router;
