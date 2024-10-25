const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const {userSchema,loginSchema} =require("../validation/auth.validation");
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();
const upload = require('../config/multerConfig');




router.post('/register', upload.single('profilePicture'), asyncHandler(async (req, res) => {
  const { error } = userSchema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    gender: req.body.gender,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Profile picture is required' });
  }
  req.body.profilePicture = req.file.path; 
  
  await registerUser(req, res);
}));



router.post('/login', asyncHandler(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  await loginUser(req, res);
}));

module.exports = router;
