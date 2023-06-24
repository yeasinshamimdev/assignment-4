import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import CustomApiError from '../../../error/CustomError';
import { IUser, UserModel } from './user.interface';
import { userRole } from './userConstants';

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: userRole, required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    phoneNumber: this.phoneNumber,
  });
  if (isExist) {
    throw new CustomApiError(
      httpStatus.CONFLICT,
      `duplicate key error, phone number ${this?.phoneNumber} is already exist`
    );
  }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
