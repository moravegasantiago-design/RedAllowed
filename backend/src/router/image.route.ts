import { Router } from "express";
import { requestImage } from "../controllers/image.controllers";
import upload from "../cloudinary/cloudinary";
import cookieParser from "cookie-parser";

const router = Router();

router.post("/update", cookieParser(), upload.single("image"), requestImage);

export default router;
