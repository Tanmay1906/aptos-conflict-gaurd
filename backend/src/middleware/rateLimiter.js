import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../utils/errorResponse.js';

// Rate limiting for login attempts
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
  handler: (req, res, next, options) => {
    throw new ErrorResponse(
      options.message,
      StatusCodes.TOO_MANY_REQUESTS
    );
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
