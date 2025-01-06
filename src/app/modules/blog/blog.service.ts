import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getSingleBlogFromDB,
};
