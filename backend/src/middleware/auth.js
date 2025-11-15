import { ErrorResponse } from '../utils/errorResponse.js';
import User from '../models/User.js';
import { getTokenFromHeader, verifyToken } from '../utils/jwt.js';

export const protect = async (req, res, next) => {
  try {
    let token = getTokenFromHeader(req);

    if (!token) {
      throw new ErrorResponse('Not authorized to access this route', 401);
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from the token
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      throw new ErrorResponse('User not found', 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
