const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../utills/sendErrorResponse");

const registerUser = async (req, res) => {
  console.log("req before upload ", req);
  try {
    const { name, email, password, role, gender } = req.body;

    let profilePicture = req.body.profilePicture || user.profilePicture;  // This should either be a file path (Cloudinary URL) or an avatar URL string.

    // If a file is uploaded, multer will store it in Cloudinary and set req.file
    if (req.file) {
      profilePicture = req.file.path;  // req.file.path contains the Cloudinary URL
    }

    // If no file is uploaded and there's a selected avatar, ensure the avatar URL is passed correctly
    if (!profilePicture) {
      return sendErrorResponse(res, "Profile picture is  required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return sendErrorResponse(res, "User already exists", 409);

    const user = new User({
      name,
      email,
      password,
      role,
      gender,
      profilePicture,  // Store the URL or file path (Cloudinary URL)
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const dataResponse = {
      name: user.name,
      token: token,
      role: user.role,
      isListed: user.isListed,
      profilePicture: user.profilePicture,
    };

    res.status(200).json({ success: true, data: dataResponse, message: "User registered successfully" });
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return sendErrorResponse(res, "Invalid credentials", 400);

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendErrorResponse(res, "Invalid credentials", 400);

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

    const dataResponse={
      name:user.name,
      token:token,
      role:user.role,
      isListed:user.isListed,
      profilePicture:user.profilePicture,
    }

    res.status(200).json({ success: true,data:dataResponse, message: roleMessages[user.role] || "Welcome back!" });
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

const getUserProfile = async (req, res) => {
  try {
     const id = req.user.userId;
     // Await and pass the ID directly to findById
     const user = await User.findById(id).select("email gender name");
     
     if (!user) {
        return sendErrorResponse(res, `User not found`, 404);
     }
     
     return res.status(200).json({ success: true, data: user });
  } catch (error) {
     console.error("Error at getUserProfile", error);
     sendErrorResponse(res, error.message, 500);
  }
};
const editUserProfile= async (req,res) =>{
  try{
    const id = req.user.userId;
  const {email,gender,name}=req.body;
    const user =await User.findById(id);
    if(!user){
      return sendErrorResponse(res,"User not found",404);
    }
    user.email=email;
    user.gender=gender;
    user.name=name;
    await user.save();
    return res.json({message:"Profile updated successfully",user});
  }
  catch(error){
    console.error("Error at editUserProfile",error);
    sendErrorResponse(res,error.message,500);
  }
}

const editProfileImage = async (req, res) => {
  try {
    const id = req.user.userId; // Extract the user ID from the request

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }

    let profilePicture = req.body.profilePicture || user.profilePicture; // Default to the existing profile picture

    // If a new file is uploaded, update the profile picture to the uploaded file's path
    if (req.file) {
      profilePicture = req.file.path; // req.file.path contains the Cloudinary URL or file path
    }

    // Ensure a profile picture is provided
    if (!profilePicture) {
      return sendErrorResponse(res, "Profile picture is required", 400);
    }

    // Update the user's profile picture
    user.profilePicture = profilePicture;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: { profilePicture: user.profilePicture },
    });
  } catch (error) {
    console.error("Error at editProfileImage", error);
    sendErrorResponse(res, error.message, 500);
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  editUserProfile, 
  editProfileImage 
};


