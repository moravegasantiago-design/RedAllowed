import { Router } from "express";
import {
  newChat,
  requestChat,
  requestLastMessages,
  requestMessage,
} from "../controllers/chats.controllers";
const router = Router();
router.post("/chats", requestChat);
router.post("/create", newChat);
router.post("/messages", requestMessage);
router.post("/lastMessages", requestLastMessages);
export default router;
