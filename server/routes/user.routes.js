const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const Joi = require('joi');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

const emailValidation = Joi.string().email().required().messages({
  'string.email': 'Email is invalid',
  'string.empty': 'Email is required',
});

const passwordValidation = Joi.string().required().messages({
  'string.empty': 'Password is required',
});

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: emailValidation,
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
  role: Joi.string().valid('seeker', 'host', 'admin').required().messages({
    'any.only': 'Role must be one of: seeker, host, admin',
  }),
});


const loginSchema = Joi.object({
  email: emailValidation,
  password: passwordValidation,
});


router.post('/register', asyncHandler(async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
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
