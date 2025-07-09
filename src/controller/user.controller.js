import { asyncHandler } from "../util/asyncHandler.js";
import { uploadToCloudinary } from "../util/cloudinary.js";
import { User } from "../model/user.model.js";
import {ApiError} from "../util/apiError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  console.log(fullName, email, userName, password);

  if(fullName === ""){
    throw new ApiError(400,"Please enter your full name");
  }

  if(email === ""){
    throw new ApiError(400, "Please enter your full email address")
  }

  if(userName === ""){
    throw new ApiError(400, "Please enter your complete user-name")
  }

  if(password === ""){
    throw new ApiError(400, "Please enter password")
  }
  
});

export { registerUser };
