const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../utills/sendErrorResponse");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    const roleMessages = {
      seeker: "You have successfully registered as a seeker!",
      host: "You have successfully registered as a host!",
      admin: "You have successfully registered as an admin!",
    };

    res
      .status(201)
      .json({ message: roleMessages[role] || "User registered successfully!" });
  } catch (error) {
    sendErrorResponse(res, error.message, 400);
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

    res.json({ token, message: roleMessages[user.role] || "Welcome back!" });
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

module.exports = { registerUser, loginUser };
