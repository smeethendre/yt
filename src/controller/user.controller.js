import { asyncHandler } from "../util/asyncHandler.js";
import { uploadToCloudinary } from "../util/cloudinary.js";
import { User } from "../model/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  console.log("email: ", email);
  
});

export { registerUser };
