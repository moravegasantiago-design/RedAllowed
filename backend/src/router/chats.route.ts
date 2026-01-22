import { Router } from "express";
import { newChat, requestChat } from "../controllers/chats.controllers";
const router = Router();
router.get("/chats", requestChat);
router.post("/create", newChat);
export default router;
