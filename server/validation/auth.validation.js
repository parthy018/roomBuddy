const Joi = require('joi');



const emailValidation = Joi.string().email().required().messages({
  'string.email': 'Email is invalid',
  'string.empty': 'Email is required',
});

const passwordValidation = Joi.string().required().messages({
  'string.empty': 'Password is required',
});

const loginSchema = Joi.object({
    email: emailValidation,
    password: passwordValidation,
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
    gender: Joi.string().valid('male', 'female').required().messages({
      'any.only': 'Gender must be one of: male, female',
    }),
  
  });
  



module.exports = { loginSchema, userSchema }  