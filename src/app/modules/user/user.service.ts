import { IUser } from './user.interface';
import { User } from './user.model';
// // create user into DB
// const createUserIntoDB = async (payload: IUser) => {
//   const result = await User.create(payload);
//   return result;
// };
//get single user from DB
const getSingleUserFromBD = async (id: string) => {
  const result = await User.findById(id);
  return result;
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
