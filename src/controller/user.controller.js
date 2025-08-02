import { asyncHandler } from "../util/asyncHandler.js";
import { uploadToCloudinary } from "../util/cloudinary.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../util/apiError.js";
import { ApiResponse } from "../util/apiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(501, "Something went wrong");
  }
};

// to register the user
// take all the info from req.body
// check if all required fields are not left empty, if left empty then throw an error
// check if the user already exists
// if user exists throw error

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
  console.log("a")

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Upload your avatar");
  // }
  console.log("b");
  

  //

  const avatar = await uploadToCloudinary(avatarLocalPath);

  console.log("c");
  

  const coverImage = await uploadToCloudinary(coverImageLocalPath);

  // if (!avatar) {
  //   throw new ApiError(400, "Upload your avatar");
  // }
  console.log("d");
  

  const user = await User.create({
    fullName,
    avatar: avatar?.url || "",
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  console.log("e");
  

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// To login a user
// check if email, username exist
// if exists then check for password
// access and refresh token
// if password is correct then send secure cookies
// send a success response

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!userName && !email) {
    throw new ApiError(400, "Enter your username or Email ");
  }

  if (password === "") {
    throw new ApiError(400, "Enter your password");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(404, "User doesn't exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password Incorrect");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User LoggedIn Successfully"
      )
    );
});

// To logOut the user
// remove the refreshToken from the cookies of the user
// 

const logoutUser = asyncHandler(async (req, res) => {
  
});

export { registerUser, loginUser };
