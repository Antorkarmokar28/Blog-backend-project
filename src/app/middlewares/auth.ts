import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsynch from '../utils/catchAsync';
// import { User } from '../modules/user/user.model';
import AppError from '../errors/appError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

const auth = (...requiredRole: string[]) => {
  return catchAsynch(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // if the token sent from the client
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Access token missing or invalid',
      );
    }
    //if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const role = decoded?.role;

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
