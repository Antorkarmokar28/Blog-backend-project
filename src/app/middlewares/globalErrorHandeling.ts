import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandeling: ErrorRequestHandler = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    error: err,
  });
};

export default globalErrorHandeling;
