import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate OTP
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

// Send OTP via Email
export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Verification Code",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
