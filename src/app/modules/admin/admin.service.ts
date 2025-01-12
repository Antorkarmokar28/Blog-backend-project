import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

const userIsBlockedInfoUpdateIntoDB = async (
  id: string,
  payload: Partial<IUser>,
) => {
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
};

const userBlogDeleteFromDBWithAdmin = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  return blog;
};

export const AdminActionService = {
  userIsBlockedInfoUpdateIntoDB,
  userBlogDeleteFromDBWithAdmin,
};
