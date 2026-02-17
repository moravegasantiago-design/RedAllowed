import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Request } from "express";
import multer from "multer";
import { CLOUD_KEY, CLOUD_NAME, CLOUD_SECRET } from "../keysEnv";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});
const upload = multer({ storage: multer.memoryStorage() });

export const uploadCloudinary = async (req: Request) => {
  try {
    if (!req.file?.buffer) return null;

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "profile-pictures",
          transformation: [{ width: 400, height: 400, crop: "fill" }],
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        },
      );
      stream.end(req.file!.buffer);
    });

    return result.secure_url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default upload;
