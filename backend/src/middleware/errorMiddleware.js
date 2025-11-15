// Error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  const response = {
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  };

  // Include validation errors if present
  if (err.errors) {
    response.errors = err.errors;
  }

  res.status(statusCode).json(response);
};
