import { Router } from "express";
import {
  newChat,
  requestChat,
  requestMessage,
} from "../controllers/chats.controllers";
const router = Router();
router.get("/chats", requestChat);
router.post("/create", newChat);
router.post("/messages", requestMessage);
export default router;
