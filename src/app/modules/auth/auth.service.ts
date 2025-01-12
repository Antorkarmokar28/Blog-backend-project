import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILogin } from './login.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//user registar into data base
const userRegisterIntoDB = async (payload: IUser) => {
  const { email } = payload;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'Email already registered');
  }
  const result = await User.create(payload);
  return result;
};
//user login
const userLogin = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  //checking user is exist
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  //checking user is blocke or unblocked
  const userIsBlocked = user?.isBlocked;
  if (userIsBlocked === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }
  //checking user password is matched
  const passwordMatch = await bcrypt.compare(payload?.password, user?.password);
  if (!passwordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  //generate user token
  const token = jwt.sign({ email: user?.email, role: user?.role }, 'secret', {
    expiresIn: '30d',
  });
  const verifiedData = {
    name: user?.name,
    emai: user?.email,
    role: user?.role,
    isBlocked: user?.isBlocked,
  };
  return { token, verifiedData };
};
export const UserAuthService = {
  userRegisterIntoDB,
  userLogin,
};
