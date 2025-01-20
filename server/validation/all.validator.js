import asyncHandler from "../middleware/asyncHandler.js";
import sendErrorResponse from "../utils/sendErrorResponse.js";
import { loginSchema, userSchema } from "./auth.validation.js";
import { roomValidation } from "./room.validation.js";
import { roommateValidation } from "./roommate.validation.js";

export const userValidator = asyncHandler(async (req, res, next) => {
  const { error } = userSchema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    gender: req.body.gender,
  });
  if (error) {
    console.log(error);
    return sendErrorResponse(res, (message = error.details[0].message));
  }
  next();
});

export const loginValidator = asyncHandler(async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return sendErrorResponse(res, (message = error.details[0].message));
  }
  next();
});

export const roommateValidator = asyncHandler(async (req, res, next) => {
  const { error } = roommateValidation.validate(req.body);
  if (error) {
    return sendErrorResponse(res, (message = error.details[0].message));
  }
  if (!req.files || req.files.length < 1 || req.files.length > 3) {
    return sendErrorResponse(res, (message = "Please upload 1 to 3 images"));
  }
  next();
});

export const roomValidator = asyncHandler(async (req, res, next) => {
  const { error } = roomValidation.validate(req.body);
  if (error) {
    return sendErrorResponse(res, (message = error.details[0].message));
  }
  next();
});
