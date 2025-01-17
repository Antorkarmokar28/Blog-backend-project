import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';
// import { searchAbleFields } from './blog.const';
// create blog into db
const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};
//get single blog from db
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id).populate('author', 'name email');
  return result;
};
// get all blog from db
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  // const result = await Blog.find(query).populate('author', 'name email');
  // return result;
  const queryObj = { ...query };

  const search = query.search || '';

  const searchAbleFields = ['title', 'content', 'creatAt'];

  const excludingQuery = ['search', 'sortBy', 'sortOrder'];

  excludingQuery.forEach((key) => delete queryObj[key]);

  // user search with query then get blog post
  const searchQuery = Blog.find({
    $or: searchAbleFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });
  // shorting data
  let sortString;
  if (query?.sortBy && query?.sortOrder) {
    const sortBy = query?.sortBy;
    const sortOrder = query?.sortOrder;
    sortString = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }
  const sortQuery = searchQuery.sort(sortString);
  // get filtering blog from db
  const result = await sortQuery
    .find(queryObj)
    .populate('author', 'name email');
  return result;
};
//update blog info into db
const updateBlogIntoDB = async (
  user: JwtPayload | undefined,
  id: string,
  payload: Partial<IBlog>,
) => {
  if (user?.role === 'admin') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Validation error');
  }
  const blog = await Blog.findByIdAndUpdate(id, payload);
  if (!blog) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Blog not found or you are not the author',
    );
  }
  return blog;
};
//delete data from db
const deleteBlogFromDB = async (id: string, userId: JwtPayload | undefined) => {
  const author = userId?.id;
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  } else if (author !== blog) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorize');
  }
  return blog;
};

export const BlogService = {
  createBlogIntoDB,
  getSingleBlogFromDB,
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
