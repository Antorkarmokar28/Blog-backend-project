import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { ILogin, IUser } from './auth.interface';
import { User } from './auth.model';
//user registar into data base
const userRegisterIntoDB = async (payload: IUser) => {
  const email = payload?.email;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'Email already registered');
  }
  const result = await User.create(payload);
  return result;
};

//checking if the user is exist
const userLogin = async (payload: ILogin) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
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
  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };
  //generate the user access token
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  return { token };
};
export const UserAuthService = {
  userRegisterIntoDB,
  userLogin,
};
