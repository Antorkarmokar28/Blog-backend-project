// import { StatusCodes } from 'http-status-codes';
// import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
// import { searchAbleFields } from './blog.const';
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
//get all blog from db
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  // const result = await Blog.find(query).populate('author', 'name email');
  // return result;
  const queryObj = { ...query };

  const search = query.search || '';

  const searchAbleFields = ['title', 'content', 'authorId', 'creatAt'];

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
  const result = await sortQuery.find(queryObj);
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
  getAllBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
