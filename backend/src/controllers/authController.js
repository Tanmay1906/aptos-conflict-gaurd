import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../utils/errorResponse.js';

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, firmDetails } = req.body;

  // Create user
  const userData = {
    name,
    email,
    password,
    role: role || 'law_firm',
  };

  // Add firm details if registering as law firm
  if (role === 'law_firm' && firmDetails) {
    userData.firm_address = firmDetails.address;
    userData.firm_phone = firmDetails.phone;
    userData.license_number = firmDetails.licenseNumber;
  }

  const user = await User.create(userData);

  sendTokenResponse(user, StatusCodes.CREATED, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  
  // Log only non-sensitive information
  console.log(`Login attempt from IP: ${ip}, email: ${email ? 'provided' : 'missing'}`);

  // Validate email & password
  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and password', StatusCodes.BAD_REQUEST)
    );
  }

  // Check for user
  const user = await User.scope('withPassword').findOne({ where: { email } });
  
  // Use a generic error message to prevent user enumeration
  const errorResponse = new ErrorResponse('Invalid credentials', StatusCodes.UNAUTHORIZED);
  
  if (!user) {
    return next(errorResponse);
  }

  // Check if password matches
  const isMatch = await user.isPasswordMatch(password);
  
  if (!isMatch) {
    console.log(`Failed login attempt for user ID: ${user.id} from IP: ${ip}`);
    return next(errorResponse);
  }

  sendTokenResponse(user, StatusCodes.OK, res);
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        firmDetails: user.role === 'law_firm' ? {
          address: user.firm_address,
          phone: user.firm_phone,
          licenseNumber: user.license_number,
        } : null,
        walletAddress: user.wallet_address,
      },
    },
  });
});

// @desc    Update wallet address
// @route   PUT /api/v1/auth/wallet
// @access  Private
export const updateWalletAddress = asyncHandler(async (req, res, next) => {
  const { walletAddress } = req.body;

  await User.update(
    { wallet_address: walletAddress },
    { where: { id: req.user.id } }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Wallet address updated successfully',
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {},
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken(user.id);

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      firmDetails: user.role === 'law_firm' ? {
        address: user.firm_address,
        phone: user.firm_phone,
        licenseNumber: user.license_number,
      } : null,
      walletAddress: user.wallet_address,
    },
  });
};
