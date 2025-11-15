import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../utils/errorResponse.js';

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }

  await user.update(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(
        `User not found with id of ${req.params.id}`,
        StatusCodes.NOT_FOUND
      )
    );
  }

  await user.destroy();

  res.status(StatusCodes.OK).json({
    success: true,
    data: {},
  });
});
