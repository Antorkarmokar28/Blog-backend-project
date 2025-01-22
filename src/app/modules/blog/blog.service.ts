/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import { searchableFields } from './blog.const';
const createBlogIntoDB = async (userId: any, payload: IBlog) => {
  const { title, content } = payload;
  const result = await Blog.create({ title, content, author: userId });
  return result;
};
//get single blog from db
const getSingleBlogFromDB = async (id: string) => {
  const blog = await Blog.findById(id).populate('author', 'name email');
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not Found');
  }
  return blog;
};
// get all blog from db
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const search = query.search || '';

  const excludingQuery = ['search', 'sortBy', 'sortOrder', 'filter'];

  excludingQuery.forEach((key) => delete queryObj[key]);
  // User search with query to find blog posts
  const searchQuery = Blog.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });
  // Sorting data
  let sortString;
  if (query?.sortBy && query?.sortOrder) {
    const sortBy = query.sortBy as string;
    const sortOrder = query.sortOrder === 'desc' ? '-' : '';
    sortString = `${sortOrder}${sortBy}`;
  }
  const sortQuery = sortString ? searchQuery.sort(sortString) : searchQuery;
  //filtering data with author Id
  if (query.filter) {
    sortQuery.find({
      author: new mongoose.Types.ObjectId(query.filter as string),
    });
  }
  // Fetching the final result
  const result = await sortQuery
    .find(queryObj)
    .populate('author', 'name email');

  return result;
};
//update blog info into db
const updateBlogIntoDB = async (
  userId: JwtPayload | undefined,
  id: string,
  payload: Partial<IBlog>,
) => {
  const { title, content } = payload;
  const blog = await Blog.findOneAndUpdate(
    { _id: id, author: userId },
    { title, content },
    { new: true },
  );
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
  const blog = await Blog.findOneAndDelete({ _id: id, author: userId });
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

export const BlogService = {
  createBlogIntoDB,
  getSingleBlogFromDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
