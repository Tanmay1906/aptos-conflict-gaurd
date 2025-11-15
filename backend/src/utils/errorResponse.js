import { StatusCodes } from 'http-status-codes';


export class ErrorResponse extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    if (errors) {
      this.errors = errors;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
