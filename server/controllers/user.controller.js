const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../utills/sendErrorResponse");


const registerUser = async (req, res) => {
  console.log("req before upload ",req);
  // Use multer to handle the file upload
  try {
    const { name, email, password, role, gender, profilePicture } = req.body;
    const user = new User({
      name,
      email,
      password,
      role,
      gender,
      profilePicture,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const dataResponse={
      name:user.name,
      token:token,
      role:user.role,
      isListed:user.isListed,
      profilePicture:user.profilePicture,
    }

    res.status(200).json({ success: true,data:dataResponse, message: "User registered successfully" });

    
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


module.exports = { registerUser, loginUser,getUserProfile };
