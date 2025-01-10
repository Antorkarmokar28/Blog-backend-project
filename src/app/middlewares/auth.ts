import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsynch from '../utils/catchAsync';
import { User } from '../modules/user/user.model';
import AppError from '../error/appError';
import { StatusCodes } from 'http-status-codes';

const auth = (...requiredRole: string[]) => {
  return catchAsynch(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    const { email, role } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not unathorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
