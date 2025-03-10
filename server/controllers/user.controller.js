import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendErrorResponse from "../utils/sendErrorResponse.js";
import { generateOTP, sendOTPEmail } from "../config/nodemailer.config.js";
import OTPModel from "../models/otp.model.js";
import asyncHandler from "../middleware/asyncHandler.js";

// defining all controller functions
const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ email });
  console.log("existingUser", existingUser);
  if (existingUser) throw new sendErrorResponse("User already exists", 409);

  // Generate OTP and expiration time
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Send OTP to user's email
  await sendOTPEmail(email, otp);

  // Save OTP
  await OTPModel.create({
    email,
    otp,
    otpExpiresAt
  })

  res.status(200).json({
    success: true,
    message: "OTP sent to your email. Please verify to complete registration.",
  });

})

const verifyOTP = asyncHandler(async (req, res) => {
  console.log("req before upload ", req);
  const { name, email, password, role, gender, otp } = req.body;

  const tempUser = await OTPModel.findOne({ email });
  console.log("tempppppppppp User", tempUser, email);

  console.log("otp", otp, tempUser.otp);

  if (tempUser.otp !== otp || tempUser.otpExpiresAt < new Date()) {
    throw new sendErrorResponse("Invalid or expired OTP", 400);
  }

  if (!tempUser) throw new sendErrorResponse("User not found", 404);

  // Check if profile picture exists
  let profilePicture = req.body.profilePicture;

  // If no file and no avatar URL, return an error
  if (!profilePicture && !req.file) {
    return res.status(400).json({ error: "Profile picture is required" });
  }

  // If there is a file, use Cloudinary URL as the profile picture
  if (req.file) {
    profilePicture = req.file.path; // Cloudinary URL
  }

  // If there's an avatar (URL string), use that as the profile picture
  if (profilePicture && !req.file) {
    // profilePicture is expected to be a string URL (e.g., from selected avatar)
    console.log("Using selected avatar: ", profilePicture);
  }

  req.body.profilePicture = profilePicture;


  await OTPModel.deleteOne({ email });

  const user = new User({
    name,
    email,
    password,
    role,
    gender,
    profilePicture, // Store the URL or file path (Cloudinary URL)
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const dataResponse = {
    name: user.name,
    token: token,
    role: user.role,
    isListed: user.isListed,
    profilePicture: user.profilePicture,
  };

  res.status(200).json({
    success: true,
    data: dataResponse,
    message: "User registered successfully",
  });
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new sendErrorResponse("Invalid credentials", 400);

  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new sendErrorResponse("Invalid credentials", 400);

  // Generate a JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Respond with a message tailored to the user's role
  const roleMessages = {
    seeker: "Welcome back, seeker!",
    host: "Welcome back, host!",
    admin: "Welcome back, admin!",
  };

  const dataResponse = {
    name: user.name,
    token: token,
    role: user.role,
    isListed: user.isListed,
    profilePicture: user.profilePicture,
  };

  res.status(200).json({
    success: true,
    data: dataResponse,
    message: roleMessages[user.role] || "Welcome back!",
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.userId;
  // Await and pass the ID directly to findById
  const user = await User.findById(id).select("email gender name");

  if (!user) {
    throw new sendErrorResponse(`User not found`, 404);
  }

  return res.status(200).json({ success: true, data: user });
});

const editUserProfile = asyncHandler(async (req, res) => {
  const id = req.user.userId;
  const { email, gender, name } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw new sendErrorResponse("User not found", 404);
  }
  user.email = email;
  user.gender = gender;
  user.name = name;
  await user.save();
  return res.json({ message: "Profile updated successfully", user });
});

const editProfileImage = asyncHandler(async (req, res) => {
  const id = req.user.userId; // Extract the user ID from the request

  // Check if the user exists
  const user = await User.findById(id);
  if (!user) {
    throw new sendErrorResponse("User not found", 404);
  }

  let profilePicture = req.body.profilePicture || user.profilePicture; // Default to the existing profile picture

  // If a new file is uploaded, update the profile picture to the uploaded file's path
  if (req.file) {
    profilePicture = req.file.path; // req.file.path contains the Cloudinary URL or file path
  }

  // Ensure a profile picture is provided
  if (!profilePicture) {
    throw new sendErrorResponse("Profile picture is required", 400);
  }

  // Update the user's profile picture
  user.profilePicture = profilePicture;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
    data: { profilePicture: user.profilePicture },
  });

});
const changeUserPassword = asyncHandler(async (req, res) => {
  const { old_password, new_password, confirm_new_password } = req.body;
  // const userId = req.user.userId;
  const userId = req.user.userId;

  if (!old_password || !new_password || !confirm_new_password) {
    throw new sendErrorResponse("All fields are required", 400);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new sendErrorResponse("User not found", 404);
  }
  if (new_password !== confirm_new_password) {
    throw new sendErrorResponse(
      "New password and confirm new password are not match",
      409
    );
  }

  const isOldPasswordCorrect = await bcrypt.compare(
    old_password,
    user.password
  );

  if (!isOldPasswordCorrect) {
    throw new sendErrorResponse("Old password is incorrect", 404);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(new_password, salt);
  user.password = hashPassword; // Update password securely.
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

export {
  registerUser,
  verifyOTP,
  loginUser,
  getUserProfile,
  editUserProfile,
  editProfileImage,
  changeUserPassword,
};
