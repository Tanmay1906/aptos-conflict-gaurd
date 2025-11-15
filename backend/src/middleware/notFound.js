import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../utils/errorResponse.js';

export const notFound = (req, res, next) => {
  next(
    new ErrorResponse(
      `Not found - ${req.originalUrl}`,
      StatusCodes.NOT_FOUND
    )
  );
};
