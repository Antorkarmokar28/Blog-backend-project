import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import zodErrorHandaler from '../errors/zodErrorHandaler';
import handleValidationError from '../errors/handleValidationError';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandeling: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went worng!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went worng!',
    },
  ];

  // checking zod, mongose error
  if (err instanceof ZodError) {
    const simplefiedError = zodErrorHandaler(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  } else if (err.name === 'ValidationError') {
    const simplefiedError = handleValidationError(err);
    statusCode = simplefiedError?.statusCode;
    message = simplefiedError?.message;
    errorSources = simplefiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.dev_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandeling;
