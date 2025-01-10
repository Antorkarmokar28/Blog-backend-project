// import { StatusCodes } from 'http-status-codes';
// import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
// create blog into db
const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};
//get single blog from db
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};
//update blog info into db
const updateBlogIntoDB = async (id: string, payload: Partial<IBlog>) => {
  const blog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};
//delete data from db
const deleteBlogFromDB = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  return blog;
};

export const BlogService = {
  createBlogIntoDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
