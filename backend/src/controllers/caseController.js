import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import Case from '../models/Case.js';
import User from '../models/User.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { asyncHandler } from '../utils/errorResponse.js';

// @desc    Add new case
// @route   POST /api/v1/cases
// @access  Private
export const addCase = asyncHandler(async (req, res, next) => {
  const { caseNumber, lawyerName, clientName, opponentName, caseDescription } = req.body;

  // Check if case number already exists
  const existingCase = await Case.findOne({ where: { caseNumber } });
  if (existingCase) {
    return next(new ErrorResponse('Case number already exists', StatusCodes.BAD_REQUEST));
  }

  // Check for conflicts: if clientName or opponentName matches any existing case for the user
  const conflictCheck = await Case.findOne({
    where: {
      userId: req.user.id,
      [Op.or]: [
        { clientName },
        { opponentName },
      ],
    },
  });

  const conflictDetected = !!conflictCheck;

  // Create case
  const newCase = await Case.create({
    caseNumber,
    lawyerName,
    clientName,
    opponentName,
    caseDescription,
    userId: req.user.id,
    conflictDetected,
    // Simulate blockchain tx hash
    blockchainTxHash: '0x' + Math.random().toString(16).substr(2, 64),
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: {
      case: newCase,
    },
  });
});

// @desc    Get all cases for user
// @route   GET /api/v1/cases
// @access  Private
export const getCases = asyncHandler(async (req, res, next) => {
  const cases = await Case.findAll({
    where: { userId: req.user.id },
    order: [['created_at', 'DESC']],
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      cases,
    },
  });
});

// @desc    Get single case
// @route   GET /api/v1/cases/:id
// @access  Private
export const getCase = asyncHandler(async (req, res, next) => {
  const caseItem = await Case.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!caseItem) {
    return next(new ErrorResponse('Case not found', StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      case: caseItem,
    },
  });
});
