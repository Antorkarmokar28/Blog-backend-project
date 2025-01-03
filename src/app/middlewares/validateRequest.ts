import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsynch from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    },
  );
};
export default validateRequest;
