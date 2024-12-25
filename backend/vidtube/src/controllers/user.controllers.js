import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  //validation
  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiResponse(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiResponse(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  let avatar;

  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("Uploaded avatar --", avatarLocalPath);
    console.log("Uploaded avatar -- ", avatar);
  } catch (error) {
    console.log("Error uploading avatar", error);
    throw new ApiError(500, "Failed to upload avatar");
  }

  let coverImage;

  try {
    coverImage = await uploadOnCloudinary(coverLocalPath);
    console.log("Uploaded coverImage", coverLocalPath);
    console.log("Uploaded coverImage", coverImage);
  } catch (error) {
    console.log("Error uploading coverImage", error);
    throw new ApiError(500, "Failed to upload coverImage");
  }

  try {
    console.log("Attempting to create user with data:", {
      fullname,
      email,
      username,
    });

    // Validate avatar and coverImage
    if (!avatar?.url) throw new ApiError(400, "Avatar URL is missing");
    if (!coverImage?.url) throw new ApiError(400, "Cover image URL is missing");

    const user = await User.create({
      fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password, // Ensure password is hashed
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(200, createdUser, "User registered successfullyyy")
      );
  } catch (error) {
    console.error("User creation failed:", error.message);

    // Cleanup Cloudinary
    try {
      if (avatar?.public_id) {
        await deleteFromCloudinary(avatar.public_id);
      }
      if (coverImage?.public_id) {
        await deleteFromCloudinary(coverImage.public_id);
      }
    } catch (cleanupError) {
      console.error("Cleanup failed:", cleanupError.message);
    }

    throw new ApiError(500, "Something went wrong while registering a user");
  }
});

export { registerUser };
