import { body, validationResult } from "express-validator";
import { ErrorResponse } from "../utils/errorResponse.js";
import { StatusCodes } from "http-status-codes";

export const validate = (validations) => {
  return async (req, res, next) => {
    try {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      await Promise.all(validations.map((v) => v.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) return next();

      const errorMessages = errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
        value: err.value,
        location: err.location,
        type: err.type,
      }));
      
      console.log('Validation errors:', JSON.stringify(errorMessages, null, 2));

      return next(
        new ErrorResponse(
          "Validation failed",
          StatusCodes.UNPROCESSABLE_ENTITY,
          errorMessages
        )
      );
    } catch (err) {
      return next(err);
    }
  };
};

export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Firm name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Firm name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

  body("role")
    .optional()
    .isIn(["user", "admin", "law_firm"])
    .withMessage("Invalid role"),

  body("firmDetails.address")
    .if(body("role").equals("law_firm"))
    .notEmpty()
    .withMessage("Firm address is required"),

  body("firmDetails.phone")
    .if(body("role").equals("law_firm"))
    .notEmpty()
    .withMessage("Phone number is required"),

  body("firmDetails.licenseNumber")
    .if(body("role").equals("law_firm"))
    .notEmpty()
    .withMessage("Bar license number is required"),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];
