import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminActionService } from './admin.service';

const userIsBlockInfoUpdating = catchAsynch(async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  const result = await AdminActionService.userIsBlockedInfoUpdateIntoDB(
    userId,
    payload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

const userBlogDelete = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await AdminActionService.userBlogDeleteFromDBWithAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const AdminController = {
  userIsBlockInfoUpdating,
  userBlogDelete,
};
