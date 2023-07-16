/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';

export type IUserRole = 'seller' | 'buyer' | 'admin';

export type IUser = {
  _id: Schema.Types.ObjectId;
  phoneNumber: string;
  role: IUserRole;
  password?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  buyer?: Schema.Types.ObjectId | IUser;
  seller?: Schema.Types.ObjectId | IUser;
  admin?: Schema.Types.ObjectId | IAdmin;
};

export type IUserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, '_id' | 'phoneNumber' | 'password' | 'role'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
