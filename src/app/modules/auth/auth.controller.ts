import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserAuthService } from './auth.service';

//user registretion controller
const userRegister = catchAsynch(async (req, res) => {
  const payload = req.body;
  const result = await UserAuthService.userRegisterIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//user login controller
const userLogin = catchAsynch(async (req, res) => {
  const payload = req.body;
  const result = await UserAuthService.userLogin(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: result?.token,
    },
  });
});

export const UserAuthController = {
  userRegister,
  userLogin,
};
