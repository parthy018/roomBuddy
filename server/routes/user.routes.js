const express = require('express');
const { registerUser, loginUser,getUserProfile } = require('../controllers/user.controller');
const {userSchema,loginSchema} =require("../validation/auth.validation");
const {roommateValidation}=require("../validation/roommate.validation");
const {roomValidation}=require("../validation/room.validation");
const asyncHandler = require('../middleware/asyncHandler');
const { authMiddleware ,seekerAuthMiddleware} = require('../middleware/auth.middleware');
const {createNeedRoommate,createNeedRoom}=require("../controllers/property.controller");
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



router.post('/listing/need-roommate', authMiddleware, upload.array('image', 3), asyncHandler(async (req, res) => {
  const { error } = roommateValidation.validate(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }
  if (!req.files || req.files.length < 1 || req.files.length > 3) {
      return res.status(400).json({ error: "Please upload 1 to 3 images" });
  }
  await createNeedRoommate(req, res);
}));

router.post('/listing/need-room',authMiddleware, seekerAuthMiddleware, upload.none(), asyncHandler(async (req,res)=>{
  const {error}=roomValidation.validate(req.body);
  if(error){
    return res.status(400).json({error:error.details[0].message});
  }
  await createNeedRoom(req,res);
}))

router.get("/user",authMiddleware,asyncHandler(async(req,res)=>{
  await getUserProfile(req,res);
}))

module.exports = router;
