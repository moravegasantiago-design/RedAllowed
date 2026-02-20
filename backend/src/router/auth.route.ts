import { Router } from "express";
import {
  loginUser,
  logOut,
  registerUser,
  verifyMe,
} from "../controllers/auth.controllers";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", verifyMe);
router.get("/logOut", logOut);
export default router;