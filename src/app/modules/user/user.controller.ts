import { UserService } from './user.service';
import catchAsynch from '../../utils/catchAsync';
import StatusCodes from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const getSingleUser = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getSingleUserFromBD(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User data retrieved is successfully',
    data: result,
  });
});

const getAllUser = catchAsynch(async (req, res) => {
  const result = await UserService.getAllUserFromBD();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User data retrieved is successfully',
    data: result,
  });
});

const updateUser = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUserIntoDB(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User data updated is successfully',
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  getAllUser,
  updateUser,
};
