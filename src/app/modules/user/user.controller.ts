import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsynch from '../../utils/catchAsync';
import StatusCodes from 'http-status-codes';
import sendResponse from '../../middlewares/sendResponse';

const createUser = catchAsynch(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createUserIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
