import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { AutoEncryptionLoggerLevel } from "mongodb";

cloudinary.config({
  cloud_name: "process.env.CLOUDINARY_CLOUD_NAME",
  api_key: "process.env.CLOUDINARY_API_KEY",
  api_secret: "process.env.CLOUDINARY_API_SECRET",
});

const uploadToCloudinary = async (asset) => {
  try {
    if (!asset) return null;
    const response = await cloudinary.uploader.upload(asset, {
      resource_type: "auto",
    });
    console.log("uploaded successfully on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(asset);
    console.log("file upload on cloudinary failed");
  }
};


export {uploadToCloudinary};