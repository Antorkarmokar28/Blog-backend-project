import { model, Schema } from 'mongoose';
import { IUser, IUserFullName } from './user.interface';

const userFullNameSchema = new Schema<IUserFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const userSchema = new Schema<IUser>({
  name: userFullNameSchema,
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

export const User = model<IUser>('User', userSchema);
