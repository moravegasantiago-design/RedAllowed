import { Router } from "express";
import { requestImage } from "../controllers/image.controllers";
import upload from "../cloudinary/cloudinary";

const router = Router();

router.post("/update", upload.single("image"), requestImage);

export default router;
