import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import multer from "multer";
import fs from "fs";
import { CLOUD_KEY, CLOUD_NAME, CLOUD_SECRET } from "../keysEnv";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

const upload = multer({ dest: "uploads/" });

export const uploadCloudinary = async (req: Request) => {
  try {
    if (!req.file?.path) return null;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile-pictures",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });

    fs.unlinkSync(req.file?.path);
    return result.secure_url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default upload;
