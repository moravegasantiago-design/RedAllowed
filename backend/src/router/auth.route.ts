import { Router } from "express";
import {
  loginUser,
  registerUser,
  verifyMe,
} from "../controllers/auth.controllers";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", verifyMe);
export default router;
