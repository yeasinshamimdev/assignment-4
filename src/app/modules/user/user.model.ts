import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import CustomApiError from '../../../error/CustomError';
import { IUser, IUserModel } from './user.interface';
import { userRole } from './userConstants';

const userSchema = new Schema<IUser, IUserModel>(
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
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Buyer',
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true }
);

userSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<IUser | null> {
  return await User.findOne(
    { phoneNumber },
    { _id: 1, password: 1, role: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


userSchema.pre('save', async function (next) {
  // hashing user password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});


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

export const User = model<IUser, IUserModel>('User', userSchema);
