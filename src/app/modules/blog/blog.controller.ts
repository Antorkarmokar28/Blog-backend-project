import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createUser = catchAsynch(async (req, res) => {
  const payload = req.body;
  const result = await BlogService.createBlogIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getSingleBlog = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getSingleBlogFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is retrieved successfully',
    data: result,
  });
});

export const BlogController = {
  createUser,
  getSingleBlog,
};
