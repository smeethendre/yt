import { asyncHandler } from "../util/asyncHandler.js";
import { uploadToCloudinary } from "../util/cloudinary.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../util/apiError.js";
import { uploadToCloudinary } from "../util/cloudinary.js";
import { ApiResponse } from "../util/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;
  console.log(fullName, email, userName, password);

  if (fullName === "") {
    throw new ApiError(400, "Please enter your full name");
  }

  if (email === "") {
    throw new ApiError(400, "Please enter your full email address");
  }

  if (userName === "") {
    throw new ApiError(400, "Please enter your complete user-name");
  }

  if (password === "") {
    throw new ApiError(400, "Please enter password");
  }
  //
  const existingUser = await User.findOne({
    $or: [{ userName }, { email }], //either you get userName of the email.
  });

  if (existingUser) {
    throw new ApiError(409, "User already registered");
  }
  //
  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Upload your avatar");
  }

  //

  const avatar = await uploadToCloudinary(avatarLocalPath);

  const coverImage = await uploadToCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Upload your avatar");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refereshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
