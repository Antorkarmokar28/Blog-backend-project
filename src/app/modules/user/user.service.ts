import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/appError';
import { IUser } from './user.interface';
import { User } from './user.model';
// // create user into DB
// const createUserIntoDB = async (payload: IUser) => {
//   const result = await User.create(payload);
//   return result;
// };
//get single user from DB
const getSingleUserFromBD = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};
//get all user from DB
const getAllUserFromBD = async () => {
  const result = await User.find();
  return result;
};
//update user data intoDB
const updateUserIntoDB = async (id: string, payload: IUser) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const UserService = {
  // createUserIntoDB,
  getSingleUserFromBD,
  getAllUserFromBD,
  updateUserIntoDB,
};
