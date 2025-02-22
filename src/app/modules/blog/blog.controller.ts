import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
const createBlog = catchAsynch(async (req, res) => {
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId }: any = req.user;
  const result = await BlogService.createBlogIntoDB(userId, payload);
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

const getAllBlog = catchAsynch(async (req, res) => {
  const result = await BlogService.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId }: any = req.user;
  const result = await BlogService.updateBlogIntoDB(userId, id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsynch(async (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { userId }: any = req.user;
  const result = await BlogService.deleteBlogFromDB(id, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getSingleBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
};
